import createTest from '../create-test'
import Translation from '@/mixins/Translation'
const component = {
  mixins: [Translation],
  template: '<div>{{$ts("foo")}}</div>',
}
const i18nOptions = {
  locale: 'en-us',
  messages: {
    'en-us': {
      foo: 'foo~',
      test: {
        foo: 'test.foo~',
        test: {
          foo: 'test.test.foo~',
        },
      },
    },
  },
  fallbackLocale: 'en-us',
}

describe('mixins/Translation', function test() {

  it('should load a right translation data with no namespace', async function test() {
    const parent = {
      components: {test: component},
      template: '<test />',
    }
    const {wrapper} = await createTest({
      mount: parent,
      i18n: i18nOptions,
    })

    expect(wrapper.text()).to.equal('foo~')
  })

  it('should load a right translation data with namespace', async function test() {
    const parent = {
      components: {test: component},
      template: '<test data-namespace="test"/>',
    }
    const {wrapper} = await createTest({
      mount: parent,
      i18n: i18nOptions,
    })

    expect(wrapper.text()).to.equal('test.foo~')
  })

  it('should load a right translation data with parent namespace', async function test() {
    const parent = {
      mixins: [Translation],
      components: {test: component},
      template: '<test data-namespace="test"/>',
    }

    const parentDeep = {
      components: {test: parent},
      template: '<test data-namespace="test"/>',
    }

    const {wrapper} = await createTest({
      mount: parentDeep,
      i18n: i18nOptions,
    })

    expect(wrapper.text()).to.equal('test.test.foo~')
  })

  it('should load a right translation data && ignore parent namespace', async function test() {
    const parent = {
      mixins: [Translation],
      components: {test: component},
      template: '<test data-namespace="test" :data-ignore-scope-namespace="true" />',
    }

    const parentDeep = {
      components: {test: parent},
      template: '<test data-namespace="test" />',
    }

    const {wrapper} = await createTest({
      mount: parentDeep,
      i18n: i18nOptions,
    })

    expect(wrapper.text()).to.equal('test.foo~')
  })
})
