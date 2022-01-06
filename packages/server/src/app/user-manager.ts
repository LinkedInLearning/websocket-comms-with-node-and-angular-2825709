import { WebSocket } from 'ws';
import { WsMessage } from '@websocket/types';

export class UserManager {
  private sockets = new Set<WebSocket>()

  add(socket: WebSocket) {
    this.sockets.add(socket)
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

    this.sockets.forEach(socket => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data)
      }
    })
  }
}
