import { parse } from 'url';
import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';


export const GlobalThisWSS = 'sveltekitWSS';



/**
 * @typedef { import("http").IncomingMessage } IncomingMessage
 * @typedef { import("stream").Duplex } Duplex
 *
 */



/**
 *
 * @param req {IncomingMessage}
 * @param sock {Duplex}
 * @param head {Buffer}
 */
export const onHttpServerUpgrade = (req, sock, head) => {
    const pathname = req.url ? parse(req.url).pathname : null;
    if (pathname !== '/websocket') return;

    const wss = globalThis.sveltekitWSS;

    wss.handleUpgrade(req, sock, head, (ws) => {
        wss.emit('connection', ws, req);
    });
};

/**
 *
 * @returns {WebSocketServer}
 */
export const createWSSGlobalInstance = () => {
    const wss = new WebSocketServer({ noServer: true });

    globalThis.sveltekitWSS= wss;


    wss.on('connection', (ws) => {
        ws.socketId = nanoid();
    });

    return wss;
};