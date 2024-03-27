import * as _path from 'path';
import * as url from 'url';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './WebSocketUtil.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = _path.dirname(__filename);

createWSSGlobalInstance();

const { server, host, path, port} = await import('./node-index.js');
server.server.on('upgrade', onHttpServerUpgrade);


export { host, path, port, server };