import pipeAsync from 'src/lib/pipe-async'

describe('pipeAsync', function test() {
  it('should pipe async functions', async function test() {
    const result = await pipeAsync(
      ([value]) => ([value + 1]),
      ([value]) => Promise.resolve(value + 2),
    )(4)
    expect(result).to.equal(7)
  })
})
