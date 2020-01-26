/* tslint:disable:variable-name */
import {compact} from 'lodash'
import {TranslateResult} from 'vue-i18n'
import {Component, Inject, Prop, Vue, Watch} from 'vue-property-decorator'


/**
 * For isolating vue-i18n using
 * @mixin
 */
@Component({
  inject: {
    '__namespace': {default: ''},
  },
  provide(this: any) {
    // let namespace = ''
    // if(!this.dataIgnoreParentNamespace) {
    //   namespace = this.__tranNamespace
    // }
    return {
      '__namespace': this.__tranNamespace,
    }
  },
})
export default class Translation extends Vue {

  @Inject({default: ''})
  __namespace: string


  /**
   * Translation namespace
   */
  @Prop() dataNamespace: string

  @Prop({default: false}) dataIgnoreScopeNamespace: boolean

  /**
   * Save translation namespace
   */
  private __dNameSpace: string = ''

  get __tranNamespace() {

    if(this.dataIgnoreScopeNamespace) {
      return this.dataNamespace
    }
    return compact([this.__namespace, this.dataNamespace]).join('.')
  }

  /**
   * Update __dTranslation
   * @param value
   * @private
   */
  @Watch('dataNamespace', {immediate: true})
  watchNamespace(value) {
    this.__dNameSpace = value
  }

  /**
   * Return translate data
   * @param name
   */
  $ts(name): TranslateResult {
    const {__tranNamespace} = this
    const nameChane = compact([__tranNamespace, name]).join('.')
    if(!this.$t) {
      return nameChane
    }

    return this.$t(nameChane)
  }
}
