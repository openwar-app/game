import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: 'esnext'
	},
	ssr: {
		external: ['reflect-metadata']
	},
	plugins: [sveltekit()]
});
