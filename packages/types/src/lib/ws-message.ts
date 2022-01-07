import { User } from './user';

export type WsMessage = ChatRelayMessage | ChatMessage | SystemNotice | LoginMessage

export interface ChatMessage {
  event: 'chat',
  contents: string
}

export interface ChatRelayMessage {
  event: 'chatRelay'
  contents: string,
  author: User
}

export interface SystemNotice {
  event: 'systemNotice',
  contents: string,
}

export interface LoginMessage {
  event: 'login',
  user: User
}
