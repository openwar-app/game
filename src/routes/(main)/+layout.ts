import { loadTranslations } from '$lib/translations';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, parent }) => {
    let pdata = await parent();
    const initLocale = pdata.language;
    await Promise.all([
        loadTranslations(initLocale, '/'),
        loadTranslations(initLocale, url.pathname),
    ]);

    return {};
}