export const ssr = false;

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({data}) => {
   return data;
};