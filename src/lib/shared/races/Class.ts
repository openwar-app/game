import type {ClassEnum} from "$lib/shared/races/ClassEnum";

export class Class {
    constructor() {
        if(Class === this.constructor) {
            throw Error('Cannot instantiate Class class');
        }
    }

    className!:keyof typeof ClassEnum;

}