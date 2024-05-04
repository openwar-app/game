import {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";

export default class extends TypeMapLogic {
    public static isEnterable() : boolean {
        return false;
    }
}