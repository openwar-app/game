import "reflect-metadata";
import {TypeORM} from "$lib/server/database/db";
import type {Handle} from "@sveltejs/kit";
import {createNewSessionId, createOrGet, set} from "$lib/server/Session/SessionStorage";
import {dev} from "$app/environment";
import {Packet} from "$lib/shared/network";
import {ClientConnectionFactory} from "$lib/server/classes/ClientConnectionFactory";
import {WebSocket} from "ws";

const db = await TypeORM.getInstance(); //we init the db connection




export const handle: Handle = async ({ event, resolve }) => {

    const cookies = event.cookies;

    let sessionId = cookies.get('sessionid') ?? '';
    if(sessionId === '') {
        sessionId = createNewSessionId();
        cookies.set('sessionid', sessionId, { path: '/',   secure: !dev})
    }


    event.locals.session = createOrGet(sessionId);
    const response = await resolve(event);
    set(event.locals.session);
    return response;
};
//dev only
if (globalThis.sveltekitWSS !== undefined) {
    globalThis.sveltekitWSS.removeAllListeners();
}
let wssInitialized = false;
const startupWebsocketServer = () => {
    if (wssInitialized) return;
    const wss = globalThis.sveltekitWSS;
    if (wss !== undefined) {
        wss.on('connection', (ws: WebSocket, _request) => {
            const cookie = (_request.headers.cookie ?? '') as string;
            let sessionId = cookie.split(';').find(c => c.trim().startsWith('sessionid='))?.substring(10) ?? '';
            let session = createOrGet(sessionId);
            if (session.data.userid === null) {
                ws.send(JSON.stringify(new Packet.Logout()));
                ws.close();
                return;
            }
            // @ts-ignore
            ws.userId = session.data?.userid;
            ClientConnectionFactory.create(ws, wss);
        });

        wss.on('close', (ws: WebSocket) => {
            ClientConnectionFactory.remove(ws);
        });
        wssInitialized = true;
    }
};

startupWebsocketServer();