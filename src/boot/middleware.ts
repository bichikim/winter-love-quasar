import middleware from '@/lib/middleware'
import {Context} from 'quasar'

export default ({app, store, router}: Context) => {
  middleware<any, any>({app, store, router})
}
