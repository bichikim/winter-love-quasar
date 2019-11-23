import store from '@/store'

describe('store', function test() {
  const fakeContext = {}

  it('should return store', function test() {
    const myStore = store(fakeContext)
    expect(myStore).to.be.an('object')
  })
})
