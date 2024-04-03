import type { Session } from './types/TypeSession';
import crypto from "node:crypto";
import { SessionMap} from './SessionMap';


export const SESSION_LIFETIME_MS : number = 86400000; //24h
export const SESSION_CLEANUP_INTERVAL_MS : number = 60000; //1m

let lastCleanUp : number = Date.now();

export function get(sessionId: string) : Session|null {
    const elapsed = Date.now() - lastCleanUp;
    if(elapsed >= SESSION_CLEANUP_INTERVAL_MS) {
        cleanUp();
    }
    
    
    if(!SessionMap.has(sessionId)) {
        return null;
    }
    const session : Session = SessionMap.get(sessionId) as Session;
    session.lastUpdated = new Date();
    return session;
}

export function createOrGet(sessionId: string) : Session {
    
    
    let session = get(sessionId);
    if(session === null) {
        session = {
            sessionId: sessionId,
            lastUpdated: new Date(),
            data: {
                userid: null
            }
        }
        set(session);
    } 
    return session;
}

export function set(session: Session) : Session {
    SessionMap.set(session.sessionId, session);
    return session;
}


export function createNewSessionId() : string {
    let sessionId : string = '';
    while(sessionId === '' || SessionMap.has(sessionId)) {
        sessionId = crypto.randomBytes(32).toString('base64url');
        if(!SessionMap.has(sessionId))
            break;
    } 
    
    return sessionId;
}


export function remove(session: Session) : boolean {
    return SessionMap.delete(session.sessionId);
}

function cleanUp() {
    SessionMap.forEach((session : Session) : void => {
        const diff = Date.now() - session.lastUpdated.valueOf();
        if(diff > SESSION_LIFETIME_MS) {
            remove(session);
        }
    })
    lastCleanUp = Date.now();
}

export function getAllSessions() : Session[] {
    return Array.from(SessionMap.values());
}