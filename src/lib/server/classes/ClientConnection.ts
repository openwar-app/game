import {WebSocket, type WebSocketServer} from "ws";
import {fromJSON, Packet} from "$lib/shared/network";
import type {GetUser} from "$lib/shared/network/GetUser";
import {User} from "$lib/server/classes/User";
import type {NetPacket} from "$lib/shared/network/NetPacket";
import type {SendChat} from "$lib/shared/network/SendChat";
import {ChatMessage} from "$lib/shared/network/ChatMessage";
import {UserFactory} from "$lib/server/classes/UserFactory";
import type {PlayerMoveTo} from "$lib/shared/network/PlayerMoveTo";
import {MapView} from "$lib/shared/network/MapView";
import {getMapField} from "$lib/shared/Map/MapData";

export class ClientConnection {
    ws: WebSocket;
    wss: WebSocketServer;


    async onPacketMapView() {
        let user = await this.getUser();
        this.send(new MapView(user.getMapView()))
    }

    async onPacketGetUser(packet: GetUser) {
        let user = await this.getUser();
        if (packet.getUsername() === undefined || user?.getCharName() === packet.getUsername()) {
            this.sendUserData();
        }
    }

    async onPacketPlayerMoveTo(packet: PlayerMoveTo) {


        let x: number = 0, y: number = 0;
        if (packet.direction.x < 0) x = -1;
        if (packet.direction.y < 0) y = -1;
        if (packet.direction.x > 0) x = 1;
        if (packet.direction.y > 0) y = 1;
        if (x != 0 || y != 0) {
            let user = await this.getUser() as User;
            if(user.getStunnedUntil() > new Date()) return;
            const newPos = {
                x: user.getPosition().x + x,
                y: user.getPosition().y + y
            };
            let field = await getMapField(newPos.x, newPos.y);
            if(field === null) return;
            if(!(await field.getLogic()).isEnterable()) return;


            user.setStunnedUntil(new Date(Date.now() + 5000));
            user.setPosition(newPos);
        }
    }


    // @deprecated
    async sendUserData() {
        let user = await this.getUser();
        this.send(new Packet.UserData(user as User));
    }

    async onPacketSendChat(packet: SendChat) {
        let user = await this.getUser();
        let chatpacket = new ChatMessage(packet.message, user?.getCharName() ?? '');
        this.wss.clients.forEach(tgt => {
            tgt.send(JSON.stringify(chatpacket));
        });
    }


    async getUser(): Promise<User> {
        // @ts-ignore
        return await UserFactory.byId(this.ws.userId) as User;
    }


    send(packet: NetPacket) {
        this.ws.send(JSON.stringify(packet));
    }

    _userDataSync: any;

    constructor(ws: WebSocket, wss: WebSocketServer) {
        this.ws = ws;
        this.wss = wss;


        this._userDataSync = setInterval(() => this.sendUserData(), 60 * 1000);


        this.getUser().then(user => (user as User).connections.add(this));

        this.ws.on('message', (data) => {
            const packet = fromJSON(data.toString());
            let funcName = 'onPacket' + packet.PacketType;
            if (funcName in this) {
                (this as unknown as { [key: string]: Function })[funcName].call(this, packet);
            }


        });

        this.ws.on('close', () => {
            clearInterval(this._userDataSync)
            this.getUser().then(user => (user as User).connections.delete(this));
        });
    }
}