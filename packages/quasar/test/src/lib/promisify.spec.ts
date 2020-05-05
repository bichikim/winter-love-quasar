import promisify from 'src/lib/promisify'

describe('promisify', function test() {
  it('should call a function as promise', async function test() {
    const asyncCall = promisify((sec, callback) => (setTimeout(callback, sec, null, 5)))
    const result = await asyncCall(0)
    expect(result).to.equal(5)
  })
})

