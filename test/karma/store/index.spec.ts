import store from '@/store'
import Vue from 'Vue'

describe('store', function test() {
  const fakeContext = {Vue}

  it('should return store', function test() {
    const myStore = store(fakeContext)
    expect(myStore).to.be.an('object')
  })
})
