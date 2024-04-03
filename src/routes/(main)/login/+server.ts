import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {User} from "$lib/server/classes/User";
import {validatePassword} from "$lib/shared/utils";
export const POST: RequestHandler = async ({request, locals}) => {
    const ctype = request.headers.get('content-type') ?? 'unknown';
    if(ctype === 'application/json') {
        const body = await request.json();
        if(body?.action === 'login') {
            const user = await User.byEmail(body.email);
            if(user) {
                const validPassword = await User.validatePassword(body.email, body.password);
                if(validPassword) {
                    locals.session.data.userid = user.getId();
                    console.log('session', locals.session);
                    return json({status: 'ok'});
                }
            }
            return json({status: 'error', error: 'website.login.invalid_credentials'});
        }
    }

    return json({}, { status: 400 });
};