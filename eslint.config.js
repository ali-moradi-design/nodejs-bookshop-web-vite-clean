import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features', '@/features/*', '@/features/*/*', '@/features/*/*/*'],
              message: 'Feature-based layout removed — use Clean Architecture layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'src/presentation/**/*.{ts,tsx}',
      'src/domain/**/*.{ts,tsx}',
      'src/application/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features', '@/features/*', '@/features/*/*'],
              message: 'Feature-based layout removed — use Clean Architecture layers.',
            },
            {
              group: [
                '@/infrastructure/http',
                '@/infrastructure/http/*',
                '@/infrastructure/repositories',
                '@/infrastructure/repositories/*',
                '@/infrastructure/storage',
                '@/infrastructure/storage/*',
                '@/infrastructure/composition',
                '@/infrastructure/composition/*',
              ],
              message:
                'Do not import infrastructure internals here — use application use cases / DI.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/application',
                '@/application/*',
                '@/infrastructure',
                '@/infrastructure/*',
                '@/presentation',
                '@/presentation/*',
                '@/app',
                '@/app/*',
                '@/shared/api',
                '@/shared/api/*',
              ],
              message: 'Domain must stay pure — no outer-layer imports.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/application/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/infrastructure',
                '@/infrastructure/*',
                '@/presentation',
                '@/presentation/*',
                '@/app',
                '@/app/*',
              ],
              message: 'Application may depend on domain only.',
            },
          ],
        },
      ],
    },
  },
);
