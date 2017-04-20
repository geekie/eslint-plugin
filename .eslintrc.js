'use strict';

module.exports = {
  extends: ['plugin:self/recommended'],
  plugins: ['self', 'prettier'],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
