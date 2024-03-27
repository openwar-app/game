import path from "path-browserify";
import i18n from 'sveltekit-i18n';
// find all translation files
const translations = import.meta.glob(['./shared/i18n/**/*.json']);

let map:{[k: string]: any} = {};

for (const p in translations) {
    let basename = path.basename(p, '.json');
    let key = path.dirname(p).substring(14).replaceAll('/','.'); //drop ./shared/i18n/
    if(typeof map[key] === 'undefined') {
        map[key] = {
            loaders: { }
        };
    }
    if(basename != 'path') {
        map[key].loaders[basename] = translations[p];
    } else {
        map[key].path = ((await translations[p]()) as any).default;
    }

}


let config: {loaders: any[], fallbackLocale: string} = {
    loaders: [],
    fallbackLocale: 'en'
}

for(const key in map) {
    let routes : (RegExp|string)[] = [];
    if(map[key].path !== undefined) {
        map[key].path.forEach((line: string|RegExp) => {
            if (typeof line === 'string' && line.startsWith('@regex ')) {
                routes.push(new RegExp(line.substring(7)));
            } else {
                routes.push(line);
            }
        });
    }
    for(const locale in map[key].loaders) {
        config.loaders.push({
            locale,
            key,
            loader: async() => (await map[key].loaders[locale]()).default,
            routes
        })
    }
}


export const { t, locale, locales, loading, loadTranslations } = new i18n(config);