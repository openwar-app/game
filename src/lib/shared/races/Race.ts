import type {RaceEnum} from "$lib/shared/races/RaceEnum";
import type {UserStats} from "$lib/shared/User/UserStats";
import type {User} from "$lib/server/classes/User";


export class Race {
    constructor() {
        throw Error("cannot instantiate race class")
    }
    static readonly raceName:keyof typeof RaceEnum;
    static readonly BASE_STATS:UserStats;

    static calculateStats(user: User): UserStats {
        return structuredClone(this.BASE_STATS);
    }
}