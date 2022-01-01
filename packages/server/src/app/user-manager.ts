import { WebSocket } from 'ws';
import { WsUser } from './ws-user';
import { User } from '@websocket/types';

let userId = 1;

export class UserManager {
  private users: Map<WebSocket, WsUser>;

  constructor() {
    this.users = new Map()
  }

  add(urlString: string, socket: WebSocket): WsUser {
    const url = new URL(urlString)
    const user: User = { name: url.searchParams.get('name'), id: userId++ }
    const wsUser = new WsUser(user, socket);

    this.users.set(socket, wsUser)

    return wsUser
  }

  remove(user: WsUser) {
    this.users.delete(user.socket);
  }

  listActive(): WsUser[] {
    const activeUsers: WsUser[] = []

    this.users.forEach((wsUser, socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        activeUsers.push(wsUser)
      }
    })

    return activeUsers;
  }

  listActiveExcept(user: WsUser): WsUser[] {
    return this.listActive().filter(u => u !== user);
  }
}
