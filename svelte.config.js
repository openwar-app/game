import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	vitePlugin: {
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
