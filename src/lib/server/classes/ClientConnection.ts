import {WebSocket} from "ws";
import {fromJSON, Packet} from "$lib/shared/network";
import type {GetUser} from "$lib/shared/network/GetUser";
import {User} from "$lib/server/classes/User";
import type {NetPacket} from "$lib/shared/network/NetPacket";

export class ClientConnection {
    ws: WebSocket;

    async onPacketGetUser(packet: GetUser) {
        let user = await this.getUser();
        this.send(new Packet.UserData(user as User));
    }

    async getUser(): Promise<User | null> {
        // @ts-ignore
        return User.byId(this.ws.userId);
    }


    send(packet: NetPacket) {
        this.ws.send(JSON.stringify(packet));
    }

    constructor(ws: WebSocket) {
        this.ws = ws;


        this.ws.on('message', (data) => {
            const packet = fromJSON(data.toString());
            let funcName = 'onPacket' + packet.type;
            if (funcName in this) {
                (this as unknown as { [key: string]: Function })[funcName].call(this, packet);
            }


        });
    }
}