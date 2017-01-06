'use strict';

const argTestSuite = require('../fixtures/args-test-suite');

describe('sync arg test suite', () => {
  argTestSuite(false);
});

describe('async arg test suite', () => {
  argTestSuite(true);
});
