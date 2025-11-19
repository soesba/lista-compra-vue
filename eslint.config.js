
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

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
        extraFileExtensions: ['.vue']
      }
    },
    extends: [
      'eslint:recommended',
      'prettier' // ¡Asegúrate de que esté al final!
    ],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      // Prettier-style rules
      'prettier/prettier': ['error', {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        arrowParens: 'avoid',
        printWidth: 120,
      }],

      // Permite líneas más largas antes de romper
      'max-len': ['error', { code: 120, ignoreUrls: true }],

      // Desactiva la regla que fuerza saltos en cadenas de métodos
      'newline-per-chained-call': ['off'],
      // General JS/TS rules
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'no-duplicate-imports': 'error',
      'eqeqeq': ['error', 'always'],
      'no-console': 'off',
      'curly': ['error', 'all'],

      // Stylistic rules
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/max-statements-per-line': ['error', { max: 4 }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/no-mixed-operators': ['error', { allowSamePrecedence: true }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
        multilineDetection: 'brackets'
      }],
      '@stylistic/brace-style': ['error', '1tbs'],

      // Vue-specific rules
      'vue/multi-word-component-names': ['error']
    }
  },
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
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
