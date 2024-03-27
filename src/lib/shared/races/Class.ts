import type {ClassEnumString} from "$lib/shared/races/ClassEnum";

export class Class {
    constructor() {
        if(Class === this.constructor) {
            throw Error('Cannot instantiate Class class');
        }
    }

    className!:ClassEnumString;

}