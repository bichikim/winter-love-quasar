import App from '@/App.vue'
import createTest from 'test/karma/create-test'

describe('App', function test() {
  it('should render', function test() {
    const {wrapper} = createTest({
      component: App,
    })
    expect(wrapper.find('#q-app').exists()).to.equal(true)
  })
})
