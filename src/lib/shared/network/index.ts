import {Login} from "./Login";
import {GetUser} from "./GetUser";
import type {NetPacket} from "$lib/shared/network/NetPacket";
import {Logout} from "./Logout";
import {UserData} from "./UserData";
import {SendChat} from "./SendChat";
import {ChatMessage} from "./ChatMessage";
import {PlayerMoveTo} from "./PlayerMoveTo";
import {MapView} from "./MapView";

class Packet {
    static readonly Login = Login;
    static readonly GetUser = GetUser;
    static readonly Logout = Logout;
    static readonly UserData = UserData;
    static readonly SendChat = SendChat;
    static readonly ChatMessage = ChatMessage;
    static readonly PlayerMoveTo = PlayerMoveTo;
    static readonly MapView = MapView;

}

function fromJSON(json: string): NetPacket {
    const obj = JSON.parse(json);
    const type = obj.___type;
    const packet: typeof NetPacket = Packet[type as keyof typeof Packet] as typeof NetPacket
    if (packet === undefined) {
        throw Error('Unknown packet type');
    }

    let newObj = Object.create(packet.prototype);
    newObj = Object.assign(newObj, obj);
    return newObj as NetPacket;
}

export {Packet, fromJSON};


