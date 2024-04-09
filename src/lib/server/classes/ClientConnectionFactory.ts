import {ClientConnection} from "./ClientConnection";
import {WebSocket} from "ws";

const ClientConnections: Map<WebSocket, ClientConnection> = new Map<WebSocket, ClientConnection>();


export class ClientConnectionFactory {
    static create(ws: WebSocket): ClientConnection {
        const connection = new ClientConnection(ws);
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