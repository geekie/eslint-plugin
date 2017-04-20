'use strict';

module.exports = {
  configs: {
    recommended: require('./configs/recommended'),
    rules: require('./configs/rules')
  },
  rules: {
    'no-general-eslint-disable': require('./rules/no-general-eslint-disable'),
    'no-stringify-in-matcher': require('./rules/no-stringify-in-matcher')
  }
};
