import { loadTranslations } from '$lib/translations';
import type{ LayoutServerData } from './$types';


/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, data })  => {

    const { pathname } = url;
    const initLocale = data.language; // get from cookie, user session, ...
    await loadTranslations(initLocale, pathname); // keep this just before the `return`



    return {
        ...data
    } as LayoutServerData;
}



