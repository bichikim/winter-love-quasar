import {getModule, Module, VuexModule, Mutation} from 'vuex-module-decorators'
import {store} from 'src/store'

@Module({
  store: store(),
  name: 'aside',
  dynamic: true,
})
class AppModule extends VuexModule {
  swUpdateSoftReload: boolean = false
  swUpdateWaiting: boolean = false
  swError: string | null = null
  swOffline: boolean = false
  swDownloading: boolean = false

  @Mutation
  setSwError(errorMessage: string | null) {
    this.swError = errorMessage
  }

  @Mutation
  setSwUpdateWaiting(value: boolean) {
    this.swUpdateWaiting = value
  }

  @Mutation
  setSwOffline(value: boolean) {
    this.swOffline = value
  }

  @Mutation
  setSwDownLoading(value: boolean) {
    this.swDownloading = value
  }
}

export default getModule(AppModule)
