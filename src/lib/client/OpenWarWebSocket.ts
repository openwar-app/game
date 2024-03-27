import type {NetPacket} from "$lib/network/NetPacket";

export type EventCallback =  (data: any[]) => Promise<void>|void;
export type EventTypes = 'open' | 'close';
export type EventSet= Set<EventCallback>

export class OpenWarWebSocket {
    private ws!: WebSocket;
    private readonly conString: string;
    constructor(conString: string) {
        this.conString = conString;
    }




    private eventMap: Map<EventTypes, EventSet> = new Map<EventTypes, EventSet>();
    on(type: EventTypes, callback: EventCallback) {
        if(!this.eventMap.has(type)) {
            this.eventMap.set(type, new Set<EventCallback>());
        }
        this.eventMap.get(type)?.add(callback);
    }
    off(type: EventTypes, callback: EventCallback) {
        if(this.eventMap.has(type)) {
            this.eventMap.get(type)?.delete(callback);
        }
    }


    private queue: any[] = [];
    sendPacket(packet: NetPacket) {
        this.connect();
        this.send(JSON.stringify(packet));
    }


    connect() {
        if(typeof this.ws !== 'undefined') {
            if(this.ws.readyState !== WebSocket.CLOSED) {
                return;
            }
            this.ws.close(0);
        }
        this.queue = [];
        this.ws = new WebSocket(this.conString);
        this.ws.addEventListener('open', () => {
            console.log('WebSocket connected');
            if(this.queue.length > 0) {
                this.queue.forEach((data) => {
                    this.send(data);
                });
                this.queue = [];
            }
            if(this.eventMap.has('open')) {
                this.eventMap.get('open')?.forEach((callback) => {
                    callback([]);
                });
            }
        });
        this.ws.addEventListener('close', () => {
            console.log('WebSocket closed');
            if(this.eventMap.has('close')) {
                this.eventMap.get('close')?.forEach((callback) => {
                    callback([]);
                });
            }
        });
    }
    private send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        if(this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
        else {
            this.queue.push(data);
        }
    }
    close() {
        this.ws.close();
    }
}