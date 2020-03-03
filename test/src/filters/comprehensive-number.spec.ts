import comprehensiveNumber from 'src/filters/comprehensive-number'

describe('filters/comprehensive-number', function test() {
  it('should return number', function test() {
    expect(comprehensiveNumber('0')).to.equal(0)
    expect(comprehensiveNumber('')).to.equal(3)
    expect(comprehensiveNumber(4)).to.equal(4)
    expect(comprehensiveNumber(true)).to.equal(3)
  })
  it('should return undefined', function test() {
    expect(comprehensiveNumber(null)).to.equal(undefined)
    expect(comprehensiveNumber(false)).to.equal(undefined)
    expect(comprehensiveNumber('-1')).to.equal(undefined)
  })
  it('should return number with noSymbols false', function test() {
    expect(comprehensiveNumber('-1', 3, false)).to.equal(-1)
  })
  it('should return default number', function test() {
    expect(comprehensiveNumber('', 4)).to.equal(4)
  })
})
