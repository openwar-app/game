import { createWSSGlobalInstance, onHttpServerUpgrade } from './WebSocketUtil.js';
createWSSGlobalInstance();

//injecthere

server.server.on('upgrade', onHttpServerUpgrade);
