import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import User from "$lib/server/database/Entities/User";
export const POST: RequestHandler = async ({request}) => {
    const ctype = request.headers.get('content-type') ?? 'unknown';
    if(ctype === 'application/json') {
        const body = await request.json();
        switch(body.action ?? '') {
            case 'validatemail':
                const validate = await User.validateEmail(body.email);
                if(validate !== true) {
                    return json({ status:'error', error: 'website.register.email_already_exists'});
                } else {
                    return json({ status: 'ok'});
                }

        }
    }



    return json({}, { status: 400 });
};