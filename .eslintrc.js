module.exports = {
  extends: ['next', 'prettier', 'next/core-web-vitals'],
  plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] }],
    'react/display-name': 'off',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: 'class',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['UPPER_CASE']
      },
      {
        selector: 'variable',
        leadingUnderscore: 'allow',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      }
    ]
  }
};
