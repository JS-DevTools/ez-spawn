'use strict';
const chai = require('chai');
const expect = chai.expect;
const syntaxModes = require('../fixtures/syntax-modes');
const fs = require('fs');

let largeFileText = fs.readFileSync('./test/fixtures/files/large-text-file.txt');

let callCombinations = [
  {
    name: 'small text files',
    commandCall: 'test/fixtures/bin/echo-file',
    commandArgs: './test/fixtures/files/small-text-file.txt',
    expectedOutput: 'Hello, world!'
  },
  {
    name: 'large text files',
    commandCall: 'test/fixtures/bin/echo-file',
    commandArgs: './test/fixtures/files/large-text-file.txt',
    expectedOutput: largeFileText.toString()
  }
];

const echoFileBin = 'test/fixtures/bin/echo-file';

const files = {
  smallTextFile: {
    path: 'test/fixtures/files/small-text-file.txt',
    contents: fs.readFileSync('test/fixtures/files/small-text-file.txt'),
  },
  imageFile: {
    path: 'test/fixtures/files/image-file.jpg',
    contents: fs.readFileSync('test/fixtures/files/image-file.jpg'),
  },
};

// NOTES: Call spawn, default is buffer can pass a default encoding string 'utf-8' returns string
for (let spawn of syntaxModes) {
  describe(`process output (${spawn.name})`, () => {

    it('should return text output as a buffer', () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it('should return binary output as a buffer', () => {
      return spawn(`${echoFileBin} ${files.imageFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.imageFile.contents);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it('should return text output as a string', () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`, { encoding: 'utf8' })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a('string');
          expect(process.stderr).to.be.a('string');

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents.toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    for (let callComb of callCombinations) {
      describe(`on ${callComb.name}`, () => {

        describe('when the process emits data on stdout', () => {
          it('should add buffer data to the stdout property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs}`)
              .then((process) => {
                expect(Buffer.isBuffer(process.stdout)).to.equal(true);
                expect(process.stdout.toString()).to.equal(callComb.expectedOutput);
              });
          });

          it('should add string data to the stdout property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs}`, { encoding: 'utf8' })
              .then((process) => {
                expect(Buffer.isBuffer(process.stdout)).to.equal(false);
                expect(process.stdout).to.equal(callComb.expectedOutput);
              });
          });

          it('should add string data to the output property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs}`, { encoding: 'utf8' })
              .then((process) => {
                expect(Buffer.isBuffer(process.output)).to.equal(false);
                expect(process.output).to.equal(callComb.expectedOutput);
              });
          });

          it('should add buffer data to the output property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs}`)
              .then((process) => {
                expect(Buffer.isBuffer(process.stdout)).to.equal(true);
                expect(process.output.toString()).to.equal(callComb.expectedOutput);
              });
          });
        });

        describe('when the process emits data on stderr', () => {
          it('should add string data to the stderr property', () => {
            return spawn(`${callComb.commandCall} --error ${callComb.commandArgs}`, { encoding: 'utf8' })
              .then((process) => {
                expect(Buffer.isBuffer(process.stderr)).to.equal(false);
                expect(process.stderr).to.equal(callComb.expectedOutput);
              });
          });

          it('should add buffer data to the stderr property', () => {
            return spawn(`${callComb.commandCall} --error ${callComb.commandArgs}`)
              .then((process) => {
                expect(Buffer.isBuffer(process.stderr)).to.equal(true);
                expect(process.stderr.toString()).to.equal(callComb.expectedOutput);
              });
          });

          it('should add string data to the output property', () => {
            return spawn(`${callComb.commandCall} --error ${callComb.commandArgs}`, { encoding: 'utf8' })
              .then((process) => {
                expect(Buffer.isBuffer(process.output)).to.equal(false);
                expect(process.output).to.equal(callComb.expectedOutput);
              });
          });

          it('should add buffer data to the output property', () => {
            return spawn(`${callComb.commandCall} --error ${callComb.commandArgs}`)
              .then((process) => {
                expect(Buffer.isBuffer(process.output)).to.equal(true);
                expect(process.output.toString()).to.equal(callComb.expectedOutput);
              });
          });
        });

        describe('when a process emits data on both stdout and stderr', () => {

          it('should concatenate both string stdout and stderr data to the output property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs} --error ${callComb.commandArgs}`, { encoding: 'utf8' })
              .then((process) => {
                expect(Buffer.isBuffer(process.stdout)).to.equal(false);
                expect(Buffer.isBuffer(process.stderr)).to.equal(false);
                expect(Buffer.isBuffer(process.output)).to.equal(false);

                expect(process.stdout).to.equal(callComb.expectedOutput);
                expect(process.stderr).to.equal(callComb.expectedOutput);
                expect(process.output.length).to.equal(callComb.expectedOutput.length * 2);
              });
          });

          it('should concatenate both Buffer stdout and stderr data to the output property', () => {
            return spawn(`${callComb.commandCall} ${callComb.commandArgs} --error ${callComb.commandArgs}`)
              .then((process) => {
                expect(Buffer.isBuffer(process.stdout)).to.equal(true);
                expect(Buffer.isBuffer(process.stderr)).to.equal(true);
                expect(Buffer.isBuffer(process.output)).to.equal(true);

                expect(process.stdout.toString()).to.equal(callComb.expectedOutput);
                expect(process.stderr.toString()).to.equal(callComb.expectedOutput);
                expect(process.output.length).to.equal(callComb.expectedOutput.length * 2);
              });
          });

        });
      });
    }

    describe('when the process emits an error event', () => {
      it('should concatenate data to the error property', () => {
        return spawn('test/fixtures/bin/wrong-command --error ./test/fixtures/files/not-exist.txt', { encoding: 'utf8' })
          .then((process) => {
            // expect(Buffer.isBuffer(process.error)).to.equal(false);
            expect(process.error.message).to.contain('test/fixtures/bin/wrong-command ENOENT');
          });
      });
    });

    describe('on a non-text file (ex. .jpg)', () => {
      it('the file loaded in the stdout and output property should equal the original file', () => {
        let imageFile = fs.readFileSync('test/fixtures/files/image-file.jpg');

        return spawn('test/fixtures/bin/echo-file test/fixtures/files/image-file.jpg')
          .then((process) => {
            expect(Buffer.isBuffer(process.stdout)).to.equal(true);

            expect(process.stdout).to.deep.equal(imageFile);
          });
      });
    });
  });
}
