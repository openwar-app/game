import {NetPacket} from "$lib/shared/network/NetPacket";
import type {User} from "$lib/server/classes/User";
import type {UserData as IUserData} from "$lib/shared/User/UserData";
import type {RaceEnum} from "$lib/shared/races/RaceEnum";


export class UserData extends NetPacket implements IUserData {
    static readonly TYPE = 'UserData'
    id: string;

    constructor(user: User) {
        super(UserData.TYPE);
        this.id = user.getId();
        this.charname = user.getCharName();
        this.posx = user.getPosition().x;
        this.posy = user.getPosition().y;
        this.race = user.getRace();
        this.xp = user.getXP();
    }

    charname: string;
    posx: number;
    posy: number;
    race: keyof typeof RaceEnum;
    xp: number;
}