/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
     '@stylistic'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    "quotes": ["error", "double"],
    "@typescript-eslint/no-explicit-any": 'off',
    "curly": "error", 
    "no-empty": "error", 
    '@stylistic/indent': ['error', 4],
    "@stylistic/block-spacing": "error",
    "@stylistic/keyword-spacing": ["error", { "before": true }, { "after": true }],
    "@stylistic/quotes": ["error", "double"]
  }
}
