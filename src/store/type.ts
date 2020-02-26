import {IncomingMessage, ServerResponse} from 'http'
import {VueConstructor} from 'vue'


export interface SerContext {
  url: string
  req: IncomingMessage
  res: ServerResponse
}

export interface StoreContext {
  Vue: VueConstructor
  ssrContext: SerContext
}
