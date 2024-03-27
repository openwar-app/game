import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './src/lib/server/WebSocketUtil.js';
import fs from 'fs';

let closing = false;
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
				process.once('exit', function() {

					const prepath = './build/';
					if(fs.existsSync(prepath+'/injected')) return;
					fs.writeFileSync(prepath+'/injected', '');//create file to indicate that it has been injected
					console.log('injecting websocket server');
					let indexSrc = fs.readFileSync(prepath + 'index.js', 'utf8');
					let prodserverSrc = fs.readFileSync('./prodserver.js', 'utf8');
					let before = prodserverSrc.indexOf('//injecthere');
					if(before !== -1) {

						prodserverSrc = prodserverSrc.slice(0, before) + indexSrc + prodserverSrc.slice(before + 12);


						fs.writeFileSync(prepath + 'index.js', prodserverSrc, 'utf8');


						//copy ./src/lib/server/WebSocketUtil.js to ./build/WebSocketUtil.js
						fs.copyFileSync('./src/lib/server/WebSocketUtil.js', prepath + 'WebSocketUtil.js');
					}
				});

			}
		}
	]
});
