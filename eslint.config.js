import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // The accessibility work in this repo — link names, alt text, landmark
      // labels, aria-hidden on decorative icons — is invisible on screen and
      // would regress silently. These rules are the guardrail.
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Node build scripts: no browser globals, and `process`/`URL` come from Node.
    files: ['scripts/**/*.mjs', '*.config.js', 'vitest.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.test.{js,jsx}', 'src/test-setup.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]
