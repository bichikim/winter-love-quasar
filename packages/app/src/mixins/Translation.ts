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
  provide(this: { __tranNamespace: any }) {
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
  @Prop() TNamespace: string

  /**
   * Save translation namespace
   */
  private __dNameSpace: string = ''

  get __tranNamespace() {
    return compact([this.__namespace, this.TNamespace]).join('.')
  }

  /**
   * Update __dTranslation
   * @param value
   * @private
   */
  @Watch('TNamespace', {immediate: true})
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
