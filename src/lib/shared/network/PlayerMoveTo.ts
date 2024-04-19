import {NetPacket} from "$lib/shared/network/NetPacket";

type Direction = {
    x: number,
    y: number
};

export class PlayerMoveTo extends NetPacket {
    static readonly TYPE = 'PlayerMoveTo';
    direction: Direction;

    constructor(direction: Direction) {
        super(PlayerMoveTo.TYPE);
        this.direction = direction;
    }


}