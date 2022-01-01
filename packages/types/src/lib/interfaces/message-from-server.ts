import { User } from './user';

export type ServerChatMessage = MessageFromServer<ServerChatPayload>
export type RegistrationMessage = MessageFromServer<RegistrationPayload>
export type UserAddedMessage = MessageFromServer<User>
export type UserRemovedMessage = MessageFromServer<User>

export interface MessageFromServer<T = any> {
  event: 'chat' | 'registration' | 'userAdded' | 'userRemoved'
  payload: T
}

export interface ServerChatPayload {
  author: User
  contents: string
}

export interface RegistrationPayload {
  userInfo: User
}
