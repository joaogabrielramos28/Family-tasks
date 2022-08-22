module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
    '@react-native-community',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'react/no-unstable-nested-components': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};
