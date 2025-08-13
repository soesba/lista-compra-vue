import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import prettierPlugin from 'eslint-config-prettier'

export default [
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs['recommended'],
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser,
        extraFileExtensions: [ '.vue' ]
      }
    },
    plugins: {
      'prettier': prettierPlugin,
      '@stylistic': stylistic
    },
    rules: {
      'no-duplicate-imports': 'error',
      'eqeqeq': [ 'error', 'always' ],
      'no-console': [ 'off' ],
      'curly': [ 'error', 'all' ],
      'no-multiple-empty-lines': [ 'error', { max: 1 } ],
      'no-trailing-spaces': 'error',
      // 'no-unused-vars': [ 'error', {
      //   vars: 'all',
      //   args: 'after-used',
      //   ignoreRestSiblings: true
      // } ],
      '@stylistic/no-trailing-spaces': [ 'error' ],
      '@stylistic/max-statements-per-line': [ 'error', { max: 2 } ],
      '@stylistic/comma-dangle': [ 'error', 'never' ],
      '@stylistic/eol-last': [ 'error', 'always' ],
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/quotes': [ 'error', 'single', { avoidEscape: true } ],
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/no-tabs': [ 'error', { allowIndentationTabs: true } ],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/space-before-function-paren': [ 'error', 'always' ],
      '@stylistic/object-curly-spacing': [ 'error', 'always' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/arrow-spacing': [ 'error', { before: true, after: true } ],
      '@stylistic/comma-spacing': [ 'error', { before: false, after: true } ],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi': [ 'error' ],
      '@stylistic/space-in-parens': [ 'error', 'never' ],
      '@stylistic/keyword-spacing': [ 'error', { before: true, after: true } ],
      '@stylistic/space-before-blocks': [ 'error', 'always' ],
      '@stylistic/arrow-parens': [ 'error', 'as-needed' ],
      '@stylistic/no-mixed-operators': [ 'error', { allowSamePrecedence: true } ],
      '@stylistic/member-delimiter-style': [ 'error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
        multilineDetection: 'brackets'
      } ],
      '@stylistic/brace-style': [ 'error', '1tbs' ],
      'vue/multi-word-component-names': [ 'error' ]
      // "prettier/prettier": [
      //   "error",
      //   {
      //     singleQuote: true,
      //     semi: false,
      //     useTabs: false,
      //     tabWidth: 2,
      //     trailingComma: "none",
      //     bracketSpacing: true,
      //     jsxBracketSameLine: false,
      //     arrowParens: "avoid"
      //   }
      // ]
    }
  },
  {
    files: [ '**/*.vue', '**/*.js', '**/*.ts' ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser
      }
    }
  }
]