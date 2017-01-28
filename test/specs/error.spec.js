'use strict';

const chai = require('chai');
const expect = chai.expect;
const syntaxModes = require('../fixtures/syntax-modes');

for (let spawn of syntaxModes) {
  describe(`error spawning (${spawn.name})`, () => {

    it('should set `process.error`', () => {
      return spawn('test/fixtures/bin/wrong-command')
        .then((process) => {
          expect(process.error).to.be.an.instanceOf(Error);
          expect(process.error.message).to.contain('test/fixtures/bin/wrong-command ENOENT');
        });
    });

  });
}
