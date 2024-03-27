import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './src/lib/server/WebSocketUtil.js';
import fs from 'fs';
export default defineConfig({
	build: {
		target: 'esnext'
	},
	ssr: {
		external: ['reflect-metadata']
	},
	plugins: [sveltekit(),
		{
			name: 'integratedWebsocketServer',
			configureServer(server) {
				createWSSGlobalInstance();
				server.httpServer?.on('upgrade', onHttpServerUpgrade);
			},
			configurePreviewServer(server) {
				createWSSGlobalInstance();
				server.httpServer?.on('upgrade', onHttpServerUpgrade);
			}
		},
		{
			name: 'injectWebsocketServer',
			closeBundle: async function(){
				//rename ./build/index.js to ./build/node-index.js
				fs.renameSync('./build/index.js', './build/node-index.js');
				//copy ./src/lib/server/WebSocketUtil.js to ./build/WebSocketUtil.js
				fs.copyFileSync('./src/lib/server/WebSocketUtil.js', './build/WebSocketUtil.js');
				//copy ./prodserver.js to ./build/index.js
				fs.copyFileSync('./prodserver.js', './build/index.js');
			}
		}
	]
});
