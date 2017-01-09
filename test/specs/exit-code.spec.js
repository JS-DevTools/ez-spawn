'use strict';

const exitCodeTestSuite = require('../fixtures/exit-code-test-suite');

describe('sync exit code test suite', () => {
  exitCodeTestSuite(false);
});

describe('async exit code test suite', () => {
  exitCodeTestSuite(true);
});
