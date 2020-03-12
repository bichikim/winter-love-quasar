import i18n from 'src/boot/i18n'
import boot from '../create-boot'
import {shallowMount, createLocalVue} from '@vue/test-utils'
import EmptyComponent from '../EmptyComponent'

describe('i18n', function test() {
  it('should add $i18n && locale', async function test() {
    const localVue = createLocalVue()
    const {context} = await boot([i18n], localVue)
    const wrapper = shallowMount(EmptyComponent, {
      localVue,
      ...context.app,
    })

    // check i18n mixin
    expect(wrapper.vm.$i18n).to.be.an('object')

    // check new i18n()
    expect(wrapper.vm.$options.i18n).to.be.an('object')

    // check locale
    // todo vue test-utils does not support app.locale
    // expect(wrapper.vm.$root.$options.locale).to.be.a('function')
  })
})
