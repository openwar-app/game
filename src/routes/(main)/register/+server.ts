import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {User} from "$lib/server/classes/User";
import {validatePassword} from "$lib/shared/utils";
export const POST: RequestHandler = async ({request}) => {
    const ctype = request.headers.get('content-type') ?? 'unknown';
    if(ctype === 'application/json') {
        const body = await request.json();
        switch(body.action ?? '') {
            case 'validatemail': {
                const validate = await User.validateEmail(body.email, true);
                if (validate !== true) {
                    return json({status: 'error', error: validate});
                } else {
                    return json({status: 'ok'});
                }
            }
            case 'validatecharname': {
                const validate = await User.validateCharname(body.charname, true);
                if (validate !== true) {
                    return json({status: 'error', error: validate});
                } else {
                    return json({status: 'ok'});
                }
            }

            case 'register': {
                const validateEmail = await User.validateEmail(body.email, true);
                if (validateEmail !== true) {
                    return json({status: 'error', error: validateEmail});
                }
                const validateCharname = await User.validateCharname(body.charname, true);
                if (validateCharname !== true) {
                    return json({status: 'error', error: validateCharname});
                }
                const validatedPassword = validatePassword(body.password, body.password);
                if(validatedPassword !== true) {
                    return json(validatedPassword);
                }
                const newUser = User.create(
                    {
                        email: body.email,
                        charname: body.charname,
                        password: body.password,
                        race: body.race
                    }
                );
                return json({status: 'ok'});
            }
        }
    }



    return json({}, { status: 400 });
};