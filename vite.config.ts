import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		external: ['reflect-metadata']
	},
	plugins: [sveltekit()]
});
