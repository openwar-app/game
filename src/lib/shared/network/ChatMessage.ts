import {NetPacket} from "$lib/shared/network/NetPacket";
import {v4} from 'uuid';

export class ChatMessage extends NetPacket {
    static readonly TYPE = 'ChatMessage'
    message: string;
    fromUser: string;
    messageType: string;
    guid: string;


    constructor(message: string, fromUser: string, type: string = 'GLOBAL') {
        super(ChatMessage.TYPE);
        this.message = message;
        this.fromUser = fromUser;
        this.messageType = type;
        this.guid = v4();
    }


}