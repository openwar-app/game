import "reflect-metadata";
import { TypeORM } from "$lib/server/database/db";
import type {Handle} from "@sveltejs/kit";
import {createNewSessionId, createOrGet, set} from "$lib/server/Session/SessionStorage";
const db = await TypeORM.getInstance();



export const handle: Handle = async ({ event, resolve }) => {

    const cookies = event.cookies;

    let sessionId = cookies.get('sessionid') ?? '';
    if(sessionId === '') {
        sessionId = createNewSessionId();
        cookies.set('sessionid', sessionId, { path: '/'})
    }

    event.locals.session = createOrGet(sessionId);
    const response = await resolve(event);
    set(event.locals.session);
    return response;
};