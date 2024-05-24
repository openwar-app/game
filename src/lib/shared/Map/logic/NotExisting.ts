import {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";
import type {MapField} from "$lib/shared/Map/MapField";

export default class extends TypeMapLogic {
    public static isEnterable() : boolean {
        return false;
    }

}