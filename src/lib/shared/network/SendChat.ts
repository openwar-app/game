import {NetPacket} from "$lib/shared/network/NetPacket";


export class SendChat extends NetPacket {
    static readonly TYPE = 'SendChat'
    message: string;


    constructor(message: string) {
        super(SendChat.TYPE);
        this.message = message;
    }


}