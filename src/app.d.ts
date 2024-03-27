// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {Session} from "$lib/server/Session/types/TypeSession";
import type {WebSocketServer} from "ws";
import ws from 'ws';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "ws" {
	export interface WebSocket extends ws {
		socketId: string
	}
}


export {};
