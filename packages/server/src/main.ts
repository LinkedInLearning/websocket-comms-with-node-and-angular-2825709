import { ServerOptions } from 'ws';
import { environment } from './environments/environment';
import { WsHandler } from './app/ws-handler';

async function run() {
  const wsOptions: ServerOptions = {
    port: environment.wsPort
  }

  const wsHandler = new WsHandler(wsOptions);
}

run().catch(err => console.error(err))
