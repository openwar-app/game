import type {PageServerLoad} from './$types';
import {UserFactory} from "$lib/server/classes/UserFactory";

export const load: PageServerLoad = async ({ locals }) => {
    let user = null;
    if(locals.session.data?.userid !== null) {
        let userObj = await UserFactory.byId(locals.session.data.userid);
        user = { id: userObj?.getId(), email: userObj?.getEmail(), name: userObj?.getCharName() }
    }
    return {
        user
    }
};