module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  ignorePatterns: ['.eslintrc.js', 'postcss.config.js', 'tailwind.config.js']
}
