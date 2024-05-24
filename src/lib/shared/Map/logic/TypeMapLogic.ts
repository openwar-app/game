import type {MapField} from "$lib/shared/Map/MapField";
import type {SvelteComponent} from "svelte";

export abstract class TypeMapLogic {
     public static isEnterable() : boolean {
          throw Error("Method not implemented.");
     };


     public static getDescriptionComponent(field: null|MapField) : typeof SvelteComponent {
          throw Error("Method not implemented.");
     }
}