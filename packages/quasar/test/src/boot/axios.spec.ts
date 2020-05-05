import {shallowMount, createLocalVue} from '@vue/test-utils'
import boot from '../create-boot'
import axios from 'src/boot/axios'
import EmptyComponent from '../EmptyComponent'

describe('axios', function test() {
  it('should add $axios', async function test() {
    const localVue = createLocalVue()
    const {context} = await boot([axios], localVue)
    const wrapper = shallowMount(EmptyComponent, {
      ...context.app,
      localVue,
    })
    expect(wrapper.vm.$axios).to.be.a('function')
  })
})
