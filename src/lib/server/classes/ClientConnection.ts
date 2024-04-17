import {WebSocket, type WebSocketServer} from "ws";
import {fromJSON, Packet} from "$lib/shared/network";
import type {GetUser} from "$lib/shared/network/GetUser";
import {User} from "$lib/server/classes/User";
import type {NetPacket} from "$lib/shared/network/NetPacket";
import type {SendChat} from "$lib/shared/network/SendChat";
import {ChatMessage} from "$lib/shared/network/ChatMessage";

export class ClientConnection {
    ws: WebSocket;
    wss: WebSocketServer;

    async onPacketGetUser(packet: GetUser) {
        this.sendUserData();
    }


    async sendUserData() {
        let user = await this.getUser();
        this.send(new Packet.UserData(user as User));
    }

    async onPacketSendChat(packet: SendChat) {
        let user = await this.getUser();
        let chatpacket = new ChatMessage(packet.message, user?.getCharName() ?? '');
        this.wss.clients.forEach(tgt => {
            tgt.send(JSON.stringify(chatpacket));
        });
    }


    async getUser(): Promise<User | null> {
        // @ts-ignore
        return User.byId(this.ws.userId);
    }


    send(packet: NetPacket) {
        this.ws.send(JSON.stringify(packet));
    }

    _userDataSync: any;

    constructor(ws: WebSocket, wss: WebSocketServer) {
        this.ws = ws;
        this.wss = wss;


        this._userDataSync = setInterval(() => this.sendUserData(), 60 * 1000);

        this.ws.on('message', (data) => {
            const packet = fromJSON(data.toString());
            let funcName = 'onPacket' + packet.type;
            if (funcName in this) {
                (this as unknown as { [key: string]: Function })[funcName].call(this, packet);
            }


        });

        this.ws.on('close', () => {
            clearInterval(this._userDataSync)
        });
    }
}