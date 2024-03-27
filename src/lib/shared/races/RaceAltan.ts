import {Race} from "$lib/shared/races/Race";
import {RaceEnum} from "$lib/shared/races/RaceEnum";
import type {UserStats} from "$lib/shared/User/UserStats";

export class RaceAltan extends Race {
    constructor() {
        super();
    }

    static readonly raceName = RaceEnum.ALTAN;

    static BASE_STATS: UserStats = {
        agility: 3,
        intelligence: 2,
        maxHp: 10,
        strength: 3

    }
}