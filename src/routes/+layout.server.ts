import type { LayoutServerLoad } from './$types';

import { loadTranslations, locales } from '$lib/translations';


export const load: LayoutServerLoad = async ({locals, request, url}) => {

    let language = locals.session.language ?? 'auto';

    const serverLocales = locales.get();
    if(language === 'auto') {
        //detect language
        const browserLanguages = (request.headers.get('accept-language') ?? 'auto').split(',');

        for (const localeStr of browserLanguages) {
            const locale = localeStr.split(';')[0];
            if (serverLocales.includes(locale)) {
                console.log('detected language', locale);
                locals.session.language = locale;
                language = locale;
                break;
            }
        }
    }

    const { pathname } = url;
    const initLocale = locals.session.language; // get from cookie, user session, ...
    await loadTranslations(initLocale, pathname); // keep this just before the `return`


    return {
        language: locals.session.language,
        reqTime: Date.now(),
        serverLocales
    }
};