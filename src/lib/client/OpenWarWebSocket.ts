import {fromJSON} from "$lib/shared/network";
import type {NetPacket} from "$lib/shared/network/NetPacket";

export type EventCallback = (...data: any[]) => Promise<void> | void;
export type EventTypes = 'open' | 'close' | string;
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
        return callback;
    }
    off(type: EventTypes, callback: EventCallback) {
        if(this.eventMap.has(type)) {
            this.eventMap.get(type)?.delete(callback);
        }
        return callback;
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
        this.ws.addEventListener('open', (...args) => {
            if(this.queue.length > 0) {
                this.queue.forEach((data) => {
                    this.send(data);
                });
                this.queue = [];
            }
            if(this.eventMap.has('open')) {
                this.eventMap.get('open')?.forEach((callback) => {
                    callback.call(this, ...args)
                });
            }
        });
        this.ws.addEventListener('close', (...args) => {
            if(this.eventMap.has('close')) {
                this.eventMap.get('close')?.forEach((callback) => {
                    callback.call(this, ...args);
                });
            }
        });

        this.ws.addEventListener('message', (event) => {
            let msg = fromJSON(event.data);
            let onHandlerName = 'onPacket' + msg.PacketType;
            if (this.eventMap.has(onHandlerName)) {
                this.eventMap.get(onHandlerName)?.forEach((callback) => {
                    callback.call(this, msg)
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