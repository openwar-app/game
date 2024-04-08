import {NetPacket} from "$lib/shared/network/NetPacket";


export class Logout extends NetPacket {
    static readonly TYPE = 'Logout'

    constructor() {
        super(Logout.TYPE);
    }


}