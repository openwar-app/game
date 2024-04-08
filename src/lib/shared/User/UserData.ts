import type {RaceEnum} from "$lib/shared/races/RaceEnum";

export interface UserData {
    charname: string;
    race: keyof typeof RaceEnum;
    xp: number;
    posx: number;
    posy: number;

}