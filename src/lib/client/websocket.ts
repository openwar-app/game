import {OpenWarWebSocket} from "$lib/client/OpenWarWebSocket";

export const conString =
    (location.protocol === 'https:' ? 'wss://' : 'ws://') +
    location.host +
    '/websocket';
export const websocket = new OpenWarWebSocket(conString);