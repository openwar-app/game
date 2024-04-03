import type { PageServerLoad } from './$types';
import Races from '$lib/shared/races';
import {User} from "$lib/server/classes/User";
export const load: PageServerLoad = async ({ locals }) => {
    console.log(locals);
    let user = null;
    if(locals.session.data?.userid !== null) {
        let userObj = await User.byId(locals.session.data.userid);
        user = { id: userObj?.getId(), email: userObj?.getEmail(), name: userObj?.getCharName() }
    }
    return {
        user
    }
};