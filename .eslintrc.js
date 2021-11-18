module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jest'],
  env: {
    jest: true,
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/typedef': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    complexity: 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'max-params': 'off',
    'no-param-reassign': 'off',
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: true,
      },
    ],
  },
};
