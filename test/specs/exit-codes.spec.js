'use strict';

const syntaxModes = require('../fixtures/syntax-modes');
const chai = require('chai');
const expect = chai.expect;

for (let spawn of syntaxModes) {
  describe(`exit codes (${spawn.name})`, () => {
    it('When a process finishes successfully should return an exit code of 0', () => {
      return spawn('test/fixtures/bin/exit-code 0')
        .then((process) => {
          // Make sure the process was spawned without any arguments
          expect(process.command).to.equal('test/fixtures/bin/exit-code');
          expect(process.exitCode).to.equal(0);
        });
    });

    describe('When a process fails', () => {

      it('should return an exit code of 1', () => {
        return spawn('test/fixtures/bin/exit-code 1')
          .then((process) => {
            // Make sure the process was spawned without any arguments
            expect(process.command).to.equal('test/fixtures/bin/exit-code');
            expect(process.exitCode).to.equal(1);
          });
      });

      it('should return an exit code of 2', () => {
        return spawn('test/fixtures/bin/exit-code 2')
          .then((process) => {
            // Make sure the process was spawned without any arguments
            expect(process.command).to.equal('test/fixtures/bin/exit-code');
            expect(process.exitCode).to.equal(2);
          });
      });

      it('should return an exit code > 128', () =>{
        return spawn('test/fixtures/bin/exit-code 129')
          .then((process) => {
            // Make sure the process was spawned without any arguments
            expect(process.command).to.equal('test/fixtures/bin/exit-code');
            expect(process.exitCode).to.equal(129);
          });
      });
    });
  });
}
