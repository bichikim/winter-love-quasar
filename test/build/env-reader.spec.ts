import envReader from '../../build/env-reader'

describe('env-reader', function test() {
  it('should read ', function test() {
    const env = {
      'APP_FOO': 'Foo',
      'APP_BAR': 'BAR',
      'APP_JOHN': 'JOHN',
      'NOT_THING': 'NOT_THING',
    }
    expect(envReader(env)).to.deep.equal({
      'APP_FOO': '"Foo"',
      'APP_BAR': '"BAR"',
      'APP_JOHN': '"JOHN"',
      },
    )
  })
  it('should read', function test() {
    const env = {
      'VUE_FOO': 'Foo',
      'VUE_BAR': 'BAR',
      'VUE_JOHN': 'JOHN',
      'NOT_THING': 'NOT_THING',
    }
    expect(envReader(env, 'VUE')).to.deep.equal({
        'VUE_FOO': '"Foo"',
        'VUE_BAR': '"BAR"',
        'VUE_JOHN': '"JOHN"',
      },
    )
  })
})
