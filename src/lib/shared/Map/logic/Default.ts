import {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";

export default class Default extends TypeMapLogic {
    public static isEnterable() : boolean {
        return true;
    }
}