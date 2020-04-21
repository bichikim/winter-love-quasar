import {getModule, Module, Mutation, VuexModule, Action} from 'vuex-module-decorators'
import {store} from 'src/store'
import {Side} from './types'
import {Dark} from 'quasar'

@Module({
  store: store(),
  name: 'user',
  dynamic: true,
})
class UserOptionsModel extends VuexModule {
  side: Side = 'right'
  dark: boolean = Dark.isActive

  @Mutation
  setSide(side: Side) {
    this.side = side
  }

  @Mutation
  private _setDark(dark: boolean) {
    this.dark = dark
  }

  @Action
  setDark(dark: boolean) {
    Dark.set(dark)
    this._setDark(dark)
  }

  @Action
  getUserOptions() {
    //
  }
}

export default getModule(UserOptionsModel)
