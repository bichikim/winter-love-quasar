import App from '@/App.vue'
import createTest from './create-test'

describe('App', function test() {
  it('should render', async function test() {
    const {wrapper} = await createTest({
      shallowMount: [App, {}],
    })
    expect(wrapper.find('#q-app').exists()).to.equal(true)
    expect('1').to.equal('1')
  })
})
