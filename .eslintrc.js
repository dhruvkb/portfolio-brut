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
    ecmaVersion: 2020,
  },
  rules: {
    // TODO: Restore severity to 'error'
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['*.vue', '*.ts'],
      extends: [
        '@vue/typescript/recommended',
      ],
      rules: {
        'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        'no-underscore-dangle': 'off',
      },
    },
    {
      files: ['*.html'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // Replaced by vue/script-indent
      },
    },
    {
      files: ['*.vue', '*.js', '*.ts'],
      rules: {
        semi: ['warn', 'never'],
        'import/prefer-default-export': 'off',
        'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
        'no-shadow': 'off', // Replaced typescript-eslint/no-shadow
        '@typescript-eslint/no-shadow': ['warn'], // Fixes a problem with enums
      },
    },
  ],
}
