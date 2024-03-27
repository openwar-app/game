import { loadTranslations } from '$lib/translations';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, parent }) => {
    let pdata = await parent();


    const { pathname } = url;

    const initLocale = pdata.language;

    await loadTranslations(initLocale, '/'); // keep this just before the `return`

    return {};
}