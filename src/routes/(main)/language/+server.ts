import type { RequestHandler } from './$types';
import {locales} from "$lib/translations";

export const POST: RequestHandler = async ({request, cookies, locals}) => {
    let language = await request.text();
    let locs = locales.get();
    if(locs.includes(language)) {
        cookies.set('language', language, { path: '/' });
        locals.language = language;
    }
    return new Response(null, { status: 200 });
}