import {shallowMount, createLocalVue} from '@vue/test-utils'
import boot from '../create-boot'
import axios from 'src/boot/axios'

describe('axios', function test() {
  it('should go', async function test() {
    const localVue = createLocalVue()
    const {context} = await boot([axios], localVue)
    const wrapper = shallowMount({
      name: 'empty-component',
    }, {
      ...context,
      localVue,
    })
    expect(wrapper.vm.$axios).to.be.a('function')
  })
})
