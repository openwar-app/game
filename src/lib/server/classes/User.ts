import UserEntity from "$lib/server/database/Entities/User";
import emailValidator from "email-validator";
import argon2 from "argon2";
import {UserFactory} from "$lib/server/classes/UserFactory";
import type {ClientConnection} from "$lib/server/classes/ClientConnection";
import type {NetPacket} from "$lib/shared/network/NetPacket";
import polygonClipping, {type MultiPolygon, type Polygon} from 'polygon-clipping';
import {MapView} from "$lib/shared/network/MapView";
import type {UserStats} from "$lib/shared/User/UserStats";
import Races from "$lib/shared/races";
import {Packet} from "$lib/shared/network";

export class User {

    connections: Set<ClientConnection> = new Set();

    private _user: UserEntity;

    public getId() {
        return this._user.id;
    }

    public getEmail() {
        return this._user.email;
    }

    public getCharName() {
        return this._user.charname;
    }

    private constructor(user: UserEntity) {
        this._user = user;
    }

    static async create(data: Partial<UserEntity>) {
        let user = new UserEntity();
        Object.assign(user, data);
        user.password = await argon2.hash(user.password);
        await user.save();
        return new User(user);
    }

    static async validatePassword(email: string, password: string) {
        const user = await UserFactory.byEmail(email);
        if (user) {
            return argon2.verify(user._user.password, password);
        }
        return false;
    }


    static async byEmail(email: string) {
        const findUser = await UserEntity.findOne({
            where: {
                email
            }
        });
        if (findUser) {
            return new User(findUser);
        }
        return null;
    }

    static async validateEmail(email: string, failIfExists: boolean = false): Promise<true | string> {
        const validEmail = emailValidator.validate(email);
        if (!validEmail) {
            return 'website.register.invalid_email';
        }

        if (failIfExists) {
            const findUser = await UserEntity.exists({
                where: {
                    email
                }
            });
            if (findUser) {
                return 'website.register.email_already_exists';
            }
        }
        return true;
    }

    static async validateCharname(charname: string, failIfExists: boolean) {
        charname = charname.trim();
        if (charname.length < 1) {
            return 'website.register.charname_too_short';
        }
        if (charname.length > 16) {
            return 'website.register.charname_too_long';
        }
        if (!charname.match(/^[a-zA-Z0-9 ]+$/)) {
            return 'website.register.charname_invalid';
        }

        if (failIfExists) {
            const findUser = await UserEntity.exists({
                where: {
                    charname
                }
            });
            if (findUser) {
                return 'website.register.charname_already_exists';
            }
        }
        return true;
    }


    getPosition() {
        return {
            x: this._user.posx,
            y: this._user.posy
        }
    }

    updateMapView() {
        let position = this.getPosition();
        const mapViewPoly: Polygon = [[
            [position.x - 2.5, position.y + 2.5],
            [position.x + 2.5, position.y + 2.5],
            [position.x + 2.5, position.y - 2.5],
            [position.x - 2.5, position.y - 2.5],
        ]];
        this._user.mapView = polygonClipping.union(mapViewPoly, ...this._user.mapView);
    }

    setPosition(position: { x: number, y: number }) {
        this._user.posx = position.x;
        this._user.posy = position.y;

        //polygon for mapView +2, -2
        const mapViewPoly: Polygon = [[
            [position.x - 2.5, position.y + 2.5],
            [position.x + 2.5, position.y + 2.5],
            [position.x + 2.5, position.y - 2.5],
            [position.x - 2.5, position.y - 2.5],
        ]];

        const currentPoly = this._user.mapView;
        const newPoly = polygonClipping.union(mapViewPoly, ...currentPoly);
        if (polygonClipping.difference(newPoly, currentPoly).length > 0) {
            this.sendPacket(new MapView(newPoly))
        }


        this._user.mapView = newPoly;


        this._user.save();
        this.sendUserData();
    }

    sendUserData() {
        this.sendPacket(new Packet.UserData(this));
    }

    getMapView() {
        return this._user.mapView as MultiPolygon;
    }

    getRaceID() {
        return this._user.race;
    }

    getXP(): number {
        return this._user.xp;
    }

    sendPacket(packet: NetPacket) {
        this.connections.forEach(connection => {
            connection.send(packet)
        });
    }

    getCurrentLife(): number {
        return Math.min(this._user.life, this.getMaximumLife());
    }

    getMaximumLife(): number {
        return this.calculateStats().maxHp;
    }

    calculateStats(): UserStats {
        return this.getRace().calculateStats(this);
    }

    getRace() {
        return Races[this.getRaceID()];
    }

    async addXP(xp: number) {
        this._user.xp += xp;
        await this._user.save();
        this.sendUserData();
    }

    getLevel() {
        return this._user.level;
    }


    getStunnedUntil() {
        return this._user.stunnedUntil;
    }

    async setStunnedUntil(date: Date) {
        this._user.stunnedUntil = date;
        await this._user.save();
    }
}