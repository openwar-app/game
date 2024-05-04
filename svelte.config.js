import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {

	vitePlugin: {
		onwarn: (warning, handler) => {
			if (warning.code.startsWith('a11y_')) return;
			handler(warning);
		},
		dynamicCompileOptions({filename}){
			if(filename.includes('node_modules')) {
				return {runes: undefined} // or false, check what works
			}
			return {
				runes: true
			}
		}	// Vite plugin options
	},
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build'
		})
	}
};

export default config;
