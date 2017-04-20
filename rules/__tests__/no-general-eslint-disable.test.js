'use strict';

const eslint = require('eslint');
const rule = require('../no-general-eslint-disable');

const ruleTester = new eslint.RuleTester({
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  }
});

const createCases = comment => [
  `// ${comment}`,
  `//${comment}`,
  `//          ${comment}`,
  `/* ${comment} */`,
  `/*${comment}*/`,
  `/*        ${comment}*/`,
  `/*${comment}          */`,
  `/*        ${comment}          */`
];

ruleTester.run('no-general-eslint-disable', rule, {
  valid: ['const a = 1;'].concat(
    createCases('eslint-disable no-unused-vars').map(
      comment => `${comment}\nconst a = 1`
    ),
    createCases('eslint-disable-line no-unused-vars').map(
      comment => `${comment}\nconst a = 1`
    ),
    '/* eslint-disable-line no-unused-vars */ const a = 1',
    createCases('eslint-disable-next-line no-unused-vars').map(
      comment => `${comment}\nconst a = 1`
    )
  ),
  invalid: [
    {
      code: '// eslint-disable\nconst a = 1;',
      errors: [{ message: 'Specify the rules you want to disable at 1:0.' }]
    },
    {
      code: 'const a = 1; // eslint-disable-line',
      errors: [{ message: 'Specify the rules you want to disable at 1:13.' }]
    },
    {
      code: '// eslint-disable-next-line\nconst a = 1;',
      errors: [{ message: 'Specify the rules you want to disable at 1:0.' }]
    }
  ]
});
