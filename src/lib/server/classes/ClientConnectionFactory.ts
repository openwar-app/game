import {ClientConnection} from "./ClientConnection";
import {WebSocket, type WebSocketServer} from "ws";

const ClientConnections: Map<WebSocket, ClientConnection> = new Map<WebSocket, ClientConnection>();


export class ClientConnectionFactory {
    static create(ws: WebSocket, wss: WebSocketServer): ClientConnection {
        const connection = new ClientConnection(ws, wss);
        ClientConnections.set(ws, connection);
        return connection;
    }

    static get(ws: WebSocket): ClientConnection | undefined {
        return ClientConnections.get(ws);
    }

    static remove(ws: WebSocket): void {
        ClientConnections.delete(ws);

    }
}