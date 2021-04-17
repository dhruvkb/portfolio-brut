module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    // TODO: Restore severity to 'error'
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
        indent: 'off', // Replaced by vue/script-indent
      },
    },
    {
      files: ['*.js'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['state'],
          },
        ],
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.vue', '*.js'],
      rules: {
        semi: ['warn', 'never'],
        'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
      },
    },
  ],
}
