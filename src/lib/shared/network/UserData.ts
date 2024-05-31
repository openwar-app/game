import {NetPacket} from "$lib/shared/network/NetPacket";
import type {User} from "$lib/server/classes/User";
import type {UserData as IUserData} from "$lib/shared/User/UserData";
import type {RaceEnum} from "$lib/shared/races/RaceEnum";
import type {UserStats} from "$lib/shared/User/UserStats";


export class UserData extends NetPacket implements IUserData {
    static readonly TYPE = 'UserData'
    userid: string;

    constructor(user: User) {
        super(UserData.TYPE);
        this.userid = user.getId();
        this.charname = user.getCharName();
        this.posx = user.getPosition().x;
        this.posy = user.getPosition().y;
        this.race = user.getRaceID();
        this.xp = user.getXP();
        this.level = user.getLevel();
        this.life = user.getCurrentLife();
        this.stats = user.calculateStats();
    }

    charname: string;
    posx: number;
    posy: number;
    race: keyof typeof RaceEnum;
    xp: number;
    life: number;
    level: number;

    stats: UserStats
}