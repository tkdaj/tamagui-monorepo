// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/dist-electron/**',
      '**/.output/**',
      '**/build/**',
      '**/coverage/**',
      '**/.tanstack/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/routeTree.gen.ts',
      '**/*.gen.ts',
      '**/*.mjs',
      '**/metro.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',

      // React
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Monorepo boundaries - prevent cross-app imports
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Apps cannot import from other apps (desktop may reach web as part of renderer)
            {
              target: './apps/mobile/**',
              from: ['./apps/web/**', './apps/desktop/**'],
              message: 'Mobile cannot import from other apps. Use shared libs instead.',
            },
            {
              target: './apps/web/**',
              from: ['./apps/mobile/**', './apps/desktop/**'],
              message: 'Web cannot import from other apps. Use shared libs instead.',
            },
            {
              target: './apps/desktop/**',
              from: './apps/mobile/**',
              message: 'Desktop cannot import from other apps except web. Use shared libs instead.',
            },
            // Libs cannot import from apps
            {
              target: './lib/**',
              from: './apps/**',
              message: 'Libraries cannot import from apps.',
            },
          ],
        },
      ],

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig
);
