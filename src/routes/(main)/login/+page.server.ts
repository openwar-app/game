import type { PageServerLoad } from './$types';
import {User} from "$lib/server/classes/User";
export const load: PageServerLoad = async ({ locals }) => {
    let user = null;
    if(locals.session.data?.userid !== null) {
        let userObj = await User.byId(locals.session.data.userid);
        user = { id: userObj?.getId(), email: userObj?.getEmail(), name: userObj?.getCharName() }
    }
    return {
        user
    }
};