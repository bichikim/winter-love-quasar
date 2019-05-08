import middleware from '@/lib/middleware'

export default ({app, store, router}) => {
  middleware<any, any>({app, store, router})
}
