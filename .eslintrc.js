module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-void': 0
  }
}
