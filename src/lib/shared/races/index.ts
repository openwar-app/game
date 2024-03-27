import {Race} from "$lib/shared/races/Race";
import {RaceEnum} from "$lib/shared/races/RaceEnum";
import {RaceOni} from "$lib/shared/races/RaceOni";
import {RaceKrion} from "$lib/shared/races/RaceKrion";
import {RaceHuman} from "$lib/shared/races/RaceHuman";
import {RaceTuran} from "$lib/shared/races/RaceTuran";
import {RaceAltan} from "$lib/shared/races/RaceAltan";


class Races {
    static ONI = RaceOni;
    static KRION = RaceKrion;
    static HUMAN = RaceHuman;
    static TURAN = RaceTuran;
    static ALTAN = RaceAltan;

    static getRaces() : (typeof Race)[] {
        return [RaceOni, RaceKrion, RaceHuman, RaceTuran, RaceAltan];
    }
}




export default Races;
export {
    RaceOni, RaceKrion, RaceHuman, RaceTuran, RaceAltan
}