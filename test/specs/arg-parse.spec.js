'use strict';

/**
 * Suite of tests that test the argument parsing for both the ezSpawn.async and the ezSpawn.sync functions
 * depending on the state of the isAsync flag set when the function is called.
 */

const syntaxModes = require('../fixtures/syntax-modes');
const chai = require('chai');
const expect = chai.expect;

for (let spawn of syntaxModes) {
  describe(`argument parsing (${spawn.name})`, () => {

    it('should run a command without any args', () => {
      return spawn('test/fixtures/bin/echo-args')
        .then((process) => {
          // Make sure the process was spawned without any arguments
          expect(process.command).to.equal('test/fixtures/bin/echo-args');
          expect(process.args).to.deep.equal([]);

          // The output should be blank
          expect(process.stdout.toString()).to.equal('');
          expect(process.stderr.toString()).to.equal('');
        });
    });

    it('should run a command without any args with only an options object param', () => {
      return spawn('test/fixtures/bin/echo-args', { cwd: undefined })
        .then((process) => {
          expect(process.args).to.deep.equal([]);

          // The output should be blank
          expect(process.stdout.toString()).to.equal('');
          expect(process.stderr.toString()).to.equal('');
        });
    });

    it('should run a command with spaces in the name', () => {
      return spawn('"test/fixtures/bin/spaces in name"')
        .then((process) => {
          // Make sure the process was spawned without any arguments
          expect(process.command).to.equal('test/fixtures/bin/spaces in name');
          expect(process.args).to.deep.equal([]);

          // The output should be blank
          expect(process.stdout.toString()).to.equal('');
          expect(process.stderr.toString()).to.equal('');
        });
    });

    describe('with individual param args', () => {

      // Ex. --foo --bar="baz"
      it('should run a command with args that have a -- key and key/value notation', () => {
        return spawn('test/fixtures/bin/echo-args', '--foo', '--bar="baz"')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--bar="baz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --bar="baz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo --foo
      it('should run a command with repeating args', () => {
        return spawn('test/fixtures/bin/echo-args', '--foo', '--foo')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--foo'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --foo\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo="bar baz" "bip bop"
      it('should run a command with key/value notation with quotes', () => {
        return spawn('test/fixtures/bin/echo-args', '--foo="bar baz"', 'bip bop')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo="bar baz"', 'bip bop'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo="bar baz"\n' +
              'Argument #2: bip bop\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with arguments quoted as strings', () => {
        return spawn('test/fixtures/bin/spaces in name', '"foo bar"', '"baz fiz"')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/spaces in name');
            expect(process.args).to.deep.equal([
              '"foo bar"', '"baz fiz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: "foo bar"\n' +
              'Argument #2: "baz fiz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with with commands and args with an options object', () => {
        return spawn('test/fixtures/bin/echo-args', '"foo bar"', '"baz fiz"', { cwd: undefined })
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '"foo bar"', '"baz fiz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: "foo bar"\n' +
              'Argument #2: "baz fiz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });

      });
    });

    describe('with an arg array', () => {
      // Ex. --foo --bar="baz"
      it('should run a command with args that have a -- key and key/value notation', () => {
        return spawn('test/fixtures/bin/echo-args', ['--foo', '--bar="baz"'])
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--bar="baz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --bar="baz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo --foo
      it('should run a command with repeating args', () => {
        return spawn('test/fixtures/bin/echo-args', ['--foo', '--foo'])
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--foo'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --foo\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo="bar baz" "bip bop"
      it('should run a command with key/value notation with quotes', () => {
        return spawn('test/fixtures/bin/echo-args', ['--foo="bar baz"', '"bip bop"'])
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo="bar baz"', '"bip bop"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo="bar baz"\n' +
              'Argument #2: "bip bop"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with arguments quoted as strings', () => {
        return spawn('test/fixtures/bin/echo-args', ['"foo bar"', '"baz fiz"'])
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '"foo bar"', '"baz fiz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: "foo bar"\n' +
              'Argument #2: "baz fiz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });

      });

      it('should run a command with with commands and args with an options object', () => {
        return spawn('test/fixtures/bin/echo-args', ['"foo bar"', '"baz fiz"'], { cwd: undefined })
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '"foo bar"', '"baz fiz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: "foo bar"\n' +
              'Argument #2: "baz fiz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });
    });

    describe('as a single string', () => {
      // Ex. --foo --bar="baz"
      it('should run a command with args that have a -- key and key/value notation', () => {
        return spawn('test/fixtures/bin/echo-args --foo --bar="baz"')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--bar="baz"'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --bar="baz"\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with multiple args without quotes in strings', () => {
        return spawn('test/fixtures/bin/echo-args arg1 arg2')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              'arg1', 'arg2'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: arg1\n' +
              'Argument #2: arg2\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo --foo
      it('should run a command with repeating args', () => {
        return spawn('test/fixtures/bin/echo-args --foo --foo')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo', '--foo'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo\n' +
              'Argument #2: --foo\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      // Ex. --foo="bar baz" "bip bop"
      it('should run a command with key/value notation with quotes', () => {
        return spawn('test/fixtures/bin/echo-args --foo="bar baz" "bip bop"')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              '--foo="bar baz"', 'bip bop'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: --foo="bar baz"\n' +
              'Argument #2: bip bop\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with arguments quoted as strings', () => {
        return spawn('test/fixtures/bin/echo-args "foo bar" "baz fiz"')
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              'foo bar', 'baz fiz'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: foo bar\n' +
              'Argument #2: baz fiz\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });

      it('should run a command with with commands and args with an options object', () => {
        return spawn('test/fixtures/bin/echo-args "foo bar" "baz fiz"', { cwd: undefined })
          .then((process) => {
            // Make sure the process was spawned with the correct command and args
            expect(process.command).to.equal('test/fixtures/bin/echo-args');
            expect(process.args).to.deep.equal([
              'foo bar', 'baz fiz'
            ]);

            // The output should contain each argument on its own line
            let expectedOutput =
              'Argument #1: foo bar\n' +
              'Argument #2: baz fiz\n';

            expect(process.stderr.toString()).to.equal('');
            expect(process.stdout.toString()).to.equal(expectedOutput);
          });
      });
    });

    describe('failure tests', () => {
      it('should throw an error if no args are passed', () => {
        return spawn()
          .then(() => {
            chai.assert(false, 'no error was thrown');
          })
          .catch(error => {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('The command to execute is missing.');
          });
      });

      it('should throw an error if the command is empty', () => {
        return spawn('')
          .then(() => {
            chai.assert(false, 'no error was thrown');
          })
          .catch(error => {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('The command to execute is missing.');
          });
      });

      it('should throw and error if the command is not a string', () => {
        return spawn({}, 'args')
          .then(() => {
            chai.assert(false, 'no error was thrown');
          })
          .catch(error => {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('The command to execute should be a string, not an Object.');
          });
      });

      it('should throw an error if the command args are not strings or arrays', () => {
        return spawn('test/fixtures/bin/echo-args', ['--foo', {}])
          .then(() => {
            chai.assert(false, 'no error was thrown');
          })
          .catch(error => {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('The command arguments should be strings, but argument #2 is an Object.');
          });
      });
    });
  });
}
