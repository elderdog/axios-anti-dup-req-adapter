/* eslint-env node */
module.exports = {
  root: true,
  extends: '@antfu',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['*.md'],
  rules: {
    'no-console': 'off',
    'antfu/if-newline': 'off',
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'arrow-parens': ['error', 'as-needed'],
    'sort-imports': 'off',
    'curly': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
