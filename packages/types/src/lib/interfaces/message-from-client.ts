export type ClientChatMessage = MessageFromClient<ClientChatPayload>

export interface MessageFromClient<T = any> {
  event: 'chat',
  payload: T
}

export interface ClientChatPayload {
  contents: string
}
