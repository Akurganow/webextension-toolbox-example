const createWebpackConfig = require('./create-webpack-config.js')
const webpackConfig = createWebpackConfig({}, { dev: false })

module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "env": {
    "node": true,
    "es6": true,
    "browser": true,
    "jest": true,
    "webextensions": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "webextension",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": [0],
    "@typescript-eslint/no-angle-bracket-type-assertion": [0],
  }
}
