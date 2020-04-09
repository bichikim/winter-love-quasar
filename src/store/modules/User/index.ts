import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from 'src/store'
import {Side} from './types'


@Module({
  store: store(),
  name: 'user',
  dynamic: true,
})
class User extends VuexModule {
  side: Side = 'right'

  @Mutation
  setSide(side: Side) {
    this.side = side
  }
}

export default getModule(User)
