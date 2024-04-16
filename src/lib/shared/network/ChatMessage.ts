import {NetPacket} from "$lib/shared/network/NetPacket";


export class ChatMessage extends NetPacket {
    static readonly TYPE = 'ChatMessage'
    message: string;
    fromUser: string;
    messageType: string;


    constructor(message: string, fromUser: string, type: string = 'GLOBAL') {
        super(ChatMessage.TYPE);
        this.message = message;
        this.fromUser = fromUser;
        this.messageType = type;
    }


}