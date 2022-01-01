import { WebSocketServer, ServerOptions, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { UserManager } from './user-manager';
import { WsUser } from './ws-user';
import {
  ServerChatMessage,
  RegistrationMessage,
  ClientChatMessage,
  UserAddedMessage,
  UserRemovedMessage
} from '@websocket/types';

export class WsHandler {
  private server: WebSocketServer
  private manager: UserManager

  constructor(options: ServerOptions) {
    this.initWebsocketServer(options);
    this.manager = new UserManager();
  }

  private initWebsocketServer(options: ServerOptions) {
    this.server = new WebSocketServer(options)
    this.server.on('connection', (socket, request) => this.onConnection(socket, request))
    this.server.on('listening', () => this.onServerListening(options))
    this.server.on('close', () => this.onServerClose())
  }

  private onConnection(socket: WebSocket, request: IncomingMessage) {
    const requestData = {
      path: request.url,
      headers: request.headers,
    }

    const fullURL = requestData.headers.host + requestData.path
    const wsUser = this.manager.add(fullURL, socket);
    console.log(`${wsUser.tag} is connected`)

    this.sendRegistrationMessage(wsUser)
    this.sendUserAddedMessage(wsUser)

    socket.on('message', data => this.onMessage(wsUser, data))
    socket.on('close', (code, reason) => this.onSocketClosed(wsUser, code, reason))
    socket.on('error', err => this.onSocketError(wsUser, err))
  }

  private onServerClose() {
    console.log('Server has shut down')
  }

  private onServerListening(options: ServerOptions) {
    console.log(`WebSocket Server is listening on port ${options.port}...`)
  }

  private onSocketClosed(wsUser: WsUser, code: number, reason: unknown) {
    console.log(`${wsUser.tag} has disconnected with code ${code} and reason: ${reason}`)
    this.manager.remove(wsUser)
    this.sendUserRemovedMessage(wsUser)
  }

  private onSocketError(user: WsUser, err: Error) {
    console.error(`Socket error for ${user.tag}: ${err}`)
  }

  private onMessage(user: WsUser, data: RawData) {
    const message = user.receive(data)

    console.log(`From ${user.tag}`, message);
    this.relayNewChatMessage(user, message)
  }

  private sendRegistrationMessage(wsUser: WsUser) {
    const message: RegistrationMessage = {
      event: 'registration',
      payload: {
        userInfo: wsUser.user
      }
    }

    wsUser.send(message)
  }

  private sendUserAddedMessage(wsUser: WsUser) {
    const message: UserAddedMessage = {
      event: 'userAdded',
      payload: wsUser.user
    }

    this.manager.listActiveExcept(wsUser).forEach(u => u.send(message))
  }

  private sendUserRemovedMessage(wsUser: WsUser) {
    const message: UserRemovedMessage = {
      event: 'userRemoved',
      payload: wsUser.user
    }

    this.manager.listActiveExcept(wsUser).forEach(u => u.send(message))
  }

  private relayNewChatMessage(wsUser: WsUser, userChat: ClientChatMessage) {
    const outgoing: ServerChatMessage = {
      event: 'chat',
      payload: {
        author: wsUser.user,
        contents: userChat.payload.contents
      }
    }

    this.manager.listActive().forEach(u => u.send(outgoing))
  }
}
