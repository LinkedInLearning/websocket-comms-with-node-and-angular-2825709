import { User } from './user';

export type WsMessage = ChatRelayMessage | ChatMessage

export interface ChatMessage {
  event: 'chat',
  contents: string
}

export interface ChatRelayMessage {
  event: 'chatRelay'
  contents: string,
  author: User
}
