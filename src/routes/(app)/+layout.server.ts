import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({locals}) => {
    if(locals.session.data?.username === null) {
        redirect(307, '/login');
    }
};