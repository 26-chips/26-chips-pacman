module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'airbnb-typescript'
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 11,
        tsconfigRootDir: __dirname,
        project: './packages/**/tsconfig.json',
      },
      rules: {
        'eol-last': ['error', 'always'],
        'react/jsx-filename-extension': [0],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/comma-dangle': [
          'error',
          {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            enums: "always-multiline",
          },
        ],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', '*.config.*', 'dist', 'ssr-dist']
};
