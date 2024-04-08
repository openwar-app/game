import ws from 'ws';

interface WebSocket extends ws {
    socketId: string;
    userId: string;
}


export {};