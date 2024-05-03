export const ssr = false;

/** @type {import('@sveltejs/kit').LayoutLoad} */
export const load = async ({data}) => {
   return data;
};