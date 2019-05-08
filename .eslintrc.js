module.exports = {
  root: true,

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    useJSXTextNode: true,
    jsx: true,
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.tsx', 'vue'],
    },
  },

  env: {
    browser: true,
    mocha: true,
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-settingserror-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'plugin:vue/recommended'
  ],

  // required to lint *.vue files
  plugins: [
    '@typescript-eslint', 'import', 'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true
  },

  // add your custom rules here
  rules: {
    /**************************************
     * common javascript options
     **************************************/
    // off
    'one-var': 'off',
    'no-undef': 'off',

    'linebreak-style': 'off',
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    // on

    'array-callback-return': 'error',
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', {before: true, after: true}],
    'block-scoped-var': 'error',
    'block-spacing': ['error', 'never'],
    'camelcase': ['error', {'properties': 'always'}],
    'comma-dangle': ['error', 'always-multiline'],
    'capitalized-comments': [
      'error',
      'always',
      {
        line: {
          ignorePattern: '^(\w)*',
        },
        block: {
          ignorePattern: '^( ?)(tslint:disable|eslint-disable|istanbul ignore)',
        },
      },
    ],
    'comma-style': ['error', 'last'],
    'complexity': ['error', 20],
    'consistent-this': ['error', 'self'],
    'default-case': 'error',
    'func-name-matching': ['error', 'never'],
    'getter-return': 'error',
    'global-require': 'error',
    'guard-for-in': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'keyword-spacing': ['error', {
      before: false,
      after: false,
      overrides: {
        'default': {before: true, after: true},
        'const' : {before: true, after: true},
        'let' : {before: true, after: true},
        'from': {before: true, after: true},
        'import': {before: true, after: true},
        'as': {before: true, after: true},
        'export': {after: true},
        'return': {before: true, after: true},
        'this': {before: true, after: true},
        'case': {after: true},
        'extends': {before: true},
        'implements': {before: true},
      },
    }],
    'max-depth': ['error', {'max': 4}],
    'max-len': ['error', 100],
    'max-lines': ['error', 1000],
    'max-nested-callbacks': ['error', {'max': 3}],
    'max-params': ['error', {'max': 6}],
    'max-statements-per-line': ['error', {'max': 2}],
    'new-cap': ['error', {'newIsCap': true}],
    'no-alert': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'error',
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': ['error', 'functions'],
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'off',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': ['error', {'ignore': [0, 1, -1]}],
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'new-cap': 'off',
    'nonblock-statement-body-position': 'error',
    'object-curly-spacing': ['error', 'never'],
    'quotes': ['error', 'single'],
    'require-await': 'error',
    'semi': ['error', 'never'],
    'sort-keys': 'off',
    'space-before-blocks': ['error', {'functions': 'always', 'keywords': 'never', 'classes': 'always'}],
    'space-before-function-paren': ['error', {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],
    'vars-on-top': 'error',

    /**************************************
     * import
     **************************************/

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
