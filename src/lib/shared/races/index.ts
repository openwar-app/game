import {Race} from "$lib/shared/races/Race";
import {RaceEnum} from "$lib/shared/races/RaceEnum";
import {RaceOni} from "$lib/shared/races/RaceOni";
import {RaceKrion} from "$lib/shared/races/RaceKrion";
import {RaceHuman} from "$lib/shared/races/RaceHuman";
import {RaceTuran} from "$lib/shared/races/RaceTuran";
import {RaceAltan} from "$lib/shared/races/RaceAltan";


class Races {
    static readonly ONI = RaceOni;
    static readonly KRION = RaceKrion;
    static readonly HUMAN = RaceHuman;
    static readonly TURAN = RaceTuran;
    static readonly ALTAN = RaceAltan;

    static getRaces() : (typeof Race)[] {
        return [RaceOni, RaceKrion, RaceHuman, RaceTuran, RaceAltan];
    }
}




export default Races;
export {
    RaceOni, RaceKrion, RaceHuman, RaceTuran, RaceAltan
}