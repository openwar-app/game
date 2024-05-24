import {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";
import type {MapField} from "$lib/shared/Map/MapField";
import type {SvelteComponent} from "svelte";
import DescComp from "$lib/shared/Map/DescriptionComponent/Rice.svelte";

export default class Default extends TypeMapLogic {
    public static isEnterable() : boolean {
        return true;
    }

    public static getDescriptionComponent(field: null|MapField) : typeof SvelteComponent {
        return DescComp as typeof SvelteComponent
    }
}