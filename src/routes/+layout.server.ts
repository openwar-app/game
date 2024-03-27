import type { LayoutServerLoad } from './$types';

import { loadTranslations, locales } from '$lib/translations';


export const load: LayoutServerLoad = async ({locals, request, url, cookies}) => {

    let language = cookies.get('language') ?? 'auto';


    const serverLocales = locales.get();
    if(language === 'auto') {
        //detect language
        const browserLanguages = (request.headers.get('accept-language') ?? 'auto').split(',');

        for (const localeStr of browserLanguages) {
            const locale = localeStr.split(';')[0];
            if (serverLocales.includes(locale)) {
                cookies.set('language', locale, { path: '/' });
                language = locale;
                break;
            }
        }
    }

    const { pathname } = url;
    const initLocale = language; // get from cookie, user session, ...
    await loadTranslations(initLocale, pathname); // keep this just before the `return`


    return {
        language: language,
        reqTime: Date.now(),
        serverLocales
    }
};