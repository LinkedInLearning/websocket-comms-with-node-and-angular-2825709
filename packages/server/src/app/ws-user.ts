import { MessageFromClient, MessageFromServer, User } from '@websocket/types'
import { WebSocket, RawData } from 'ws'

export class WsUser {
  get name(): string {
    return this.user.name
  }

  get id(): number {
    return this.user.id
  }

  get tag(): string {
    return `${this.name} #${this.id}`
  }

  constructor(public user: User, public socket: WebSocket){}

  send(data: MessageFromServer) {
    const message = JSON.stringify(data)
    this.socket.send(message)
  }

  receive(data: RawData): MessageFromClient {
    const message: MessageFromClient = JSON.parse(`${data}`)

    return message
  }
}
