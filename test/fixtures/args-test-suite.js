'use strict';

/**
 * Suite of tests that test the argument parsing for both the ezSpawn.async and the ezSpawn.sync functions
 * depending on the state of the isAsync flag set when the function is called.
 */

const syncAsync = require('./sync-async-normalize');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

module.exports = function runArgTestSuite (isAsync) {

  // Set this so that the sync-async-normalize module knows which ezSpawn process to call.
  global.isAsync = isAsync;

  it('should run a command without any args', () => {
    return syncAsync(path.join(__dirname, 'bin/echo-args'))
      .then((process) => {
        // Make sure the process was spawned without any arguments
        expect(process.command).to.equal(path.join(__dirname, 'bin/echo-args'));
        expect(process.args).to.deep.equal([]);

        // The output should be blank
        expect(process.stdout.toString()).to.equal('');
        expect(process.stderr.toString()).to.equal('');
        expect(process.output.toString()).to.equal('');
      });
  });

  it('should run a command without any args with only an options object param', () => {
    return syncAsync(path.join(__dirname, 'bin/echo-args'), { cwd: undefined })
      .then((process) => {
        expect(process.args).to.deep.equal([]);

        // The output should be blank
        expect(process.stdout.toString()).to.equal('');
        expect(process.stderr.toString()).to.equal('');
        expect(process.output.toString()).to.equal('');
      });
  });

  it('should run a command with spaces in the name', () => {
    return syncAsync('"bin/spaces in name"')
      .then((process) => {
        // Make sure the process was spawned without any arguments
        expect(process.command).to.equal('bin/spaces in name');
        expect(process.args).to.deep.equal([]);

        // The output should be blank
        expect(process.stdout.toString()).to.equal('');
        expect(process.stderr.toString()).to.equal('');
        expect(process.output.toString()).to.equal('');
      });
  });

  describe('with individual param args', () => {

    // Ex. --foo --bar="baz"
    it('should run a command with args that have a -- key and key/value notation', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), '--foo', '--bar="baz"')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--bar="baz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --bar="baz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo --foo
    it('should run a command with repeating args', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), '--foo', '--foo')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--foo'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --foo\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo="bar baz" "bip bop"
    it('should run a command with key/value notation with quotes', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), '--foo="bar baz"', 'bip bop')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo="bar baz"', 'bip bop'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo="bar baz"\n' +
            'Argument #2: bip bop\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    it('should run a command with arguments quoted as strings', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), '"foo bar"', '"baz fiz"')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '"foo bar"', '"baz fiz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: "foo bar"\n' +
            'Argument #2: "baz fiz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    it('should run a command with with commands and args with an options object', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), '"foo bar"', '"baz fiz"', { cwd: undefined })
        .then((process) => {
          expect(process.args).to.deep.equal([
            '"foo bar"', '"baz fiz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: "foo bar"\n' +
            'Argument #2: "baz fiz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });

    });
  });

  describe('with an arg array', () => {
    // Ex. --foo --bar="baz"
    it('should run a command with args that have a -- key and key/value notation', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), ['--foo', '--bar="baz"'])
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--bar="baz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --bar="baz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo --foo
    it('should run a command with repeating args', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), ['--foo', '--foo'])
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--foo'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --foo\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo="bar baz" "bip bop"
    it('should run a command with key/value notation with quotes', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), ['--foo="bar baz"', '"bip bop"'])
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo="bar baz"', '"bip bop"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo="bar baz"\n' +
            'Argument #2: "bip bop"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    it('should run a command with arguments quoted as strings', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), ['"foo bar"', '"baz fiz"'])
        .then((process) => {
          expect(process.args).to.deep.equal([
            '"foo bar"', '"baz fiz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: "foo bar"\n' +
            'Argument #2: "baz fiz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });

    });

    it('should run a command with with commands and args with an options object', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args'), ['"foo bar"', '"baz fiz"'], { cwd: undefined })
        .then((process) => {
          expect(process.args).to.deep.equal([
            '"foo bar"', '"baz fiz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: "foo bar"\n' +
            'Argument #2: "baz fiz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });
  });

  describe('as a single string', () => {
    // Ex. --foo --bar="baz"
    it('should run a command with args that have a -- key and key/value notation', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args') + ' --foo --bar="baz"')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--bar="baz"'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --bar="baz"\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo --foo
    it('should run a command with repeating args', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args') + ' --foo --foo')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo', '--foo'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo\n' +
            'Argument #2: --foo\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    // Ex. --foo="bar baz" "bip bop"
    it('should run a command with key/value notation with quotes', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args') + ' --foo="bar baz" "bip bop"')
        .then((process) => {
          expect(process.args).to.deep.equal([
            '--foo="bar baz"', 'bip bop'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: --foo="bar baz"\n' +
            'Argument #2: bip bop\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    it('should run a command with arguments quoted as strings', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args') + ' "foo bar" "baz fiz"')
        .then((process) => {
          expect(process.args).to.deep.equal([
            'foo bar', 'baz fiz'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: foo bar\n' +
            'Argument #2: baz fiz\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });

    it('should run a command with with commands and args with an options object', () => {
      return syncAsync(path.join(__dirname, 'bin/echo-args') + ' "foo bar" "baz fiz"', { cwd: undefined })
        .then((process) => {
          expect(process.args).to.deep.equal([
            'foo bar', 'baz fiz'
          ]);

          // The output should contain each argument on its own line
          let expectedOutput =
            'Argument #1: foo bar\n' +
            'Argument #2: baz fiz\n';

          expect(process.stderr.toString()).to.equal('');
          expect(process.stdout.toString()).to.equal(expectedOutput);
          expect(process.output.toString()).to.equal(expectedOutput);
        });
    });
  });

  describe('failure tests', () => {
    it('should throw an error if no args are passed', () => {
      try {
        return syncAsync();
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command to execute is missing.');

      }
    });

    it('should throw an error if the command is empty', () => {
      try {
        return syncAsync('');
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command to execute is missing.');
      }
    });

    it('should throw and error if the command is not a string', () => {
      try {
        return syncAsync({}, 'args');
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command to execute should be a string, not an Object.');
      }
    });

    it('should throw an error if the command args are not strings or arrays', () => {
      try {
        return syncAsync(path.join(__dirname, 'bin/echo-args'), ['--foo', {}]);
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command arguments should be strings, but argument #2 is an Object.');
      }
    });

  });
};
