import { WebSocket } from 'ws';
import { LoginMessage, SystemNotice, User, WsMessage } from '@websocket/types';
import { IncomingMessage } from 'http';

let currId = 1

export class UserManager {
  private sockets = new Map<WebSocket, User>()

  add(socket: WebSocket, request: IncomingMessage) {
    //  localhost:8080/?name=Jane
    const fullURL = new URL(request.headers.host + request.url)
    const name = fullURL.searchParams.get('name')
    const user: User = {
      name,
      id: currId++
    }

    const systemNotice: SystemNotice = {
      event: 'systemNotice',
      contents: `${name} has joined the chat`
    }
    this.sendToAll(systemNotice)

    const loginMessage: LoginMessage = {
      user,
      event: 'login'
    }
    socket.send(JSON.stringify(loginMessage))

    this.sockets.set(socket, user)
  }

  remove(socket: WebSocket) {
    this.sockets.delete(socket)
  }

  send(socket: WebSocket, message: WsMessage) {
    const data = JSON.stringify(message)
    socket.send(data)
  }

  sendToAll(message: WsMessage) {
    const data = JSON.stringify(message)

    Array.from(this.sockets.keys()).forEach(socket => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data)
      }
    })
  }
}
