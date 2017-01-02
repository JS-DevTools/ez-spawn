'use strict';

const ezSpawn = require('../../');
const chai = require('chai');
const expect = chai.expect;

describe('ezSpawn.sync argument parsing', () => {

  it('should run a command without any args', () => {
    let process = ezSpawn.sync('test/fixtures/bin/echo-args');

    // Make sure the process was spawned without any arguments
    expect(process.command).to.equal('test/fixtures/bin/echo-args');
    expect(process.args).to.deep.equal([]);

    // The output should be blank
    expect(process.stdout.toString()).to.equal('');
    expect(process.stderr.toString()).to.equal('');
    expect(process.output.toString()).to.equal('');
  });

  it('should run a command with spaces in the name', () => {
    let process = ezSpawn.sync('"test/fixtures/bin/spaces in name"');

    // Make sure the process was spawned without any arguments
    expect(process.command).to.equal('test/fixtures/bin/spaces in name');
    expect(process.args).to.deep.equal([]);

    // The output should be blank
    expect(process.stdout.toString()).to.equal('');
    expect(process.stderr.toString()).to.equal('');
    expect(process.output.toString()).to.equal('');
  });

  it('should run a command and arguments, specified as a string', () => {
    let process = ezSpawn.sync('test/fixtures/bin/echo-args --foo --bar=baz');

    // Make sure the process was spawned with the correct arguments
    expect(process.command).to.equal('test/fixtures/bin/echo-args');
    expect(process.args).to.deep.equal([
      '--foo', '--bar=baz'
    ]);

    // The output should contain each argument on its own line
    let expectedOutput =
      'Argument #1: --foo\n' +
      'Argument #2: --bar=baz\n';

    expect(process.stderr.toString()).to.equal('');
    expect(process.stdout.toString()).to.equal(expectedOutput);
    expect(process.output.toString()).to.equal(expectedOutput);
  });

  it('should run a command and arguments with spaces, specified as a string', () => {
    let process = ezSpawn.sync(
      '"test/fixtures/bin/spaces in name" "spaces in arg" --bar="more spaces" --baz=\'even more spaces\''
    );

    // Make sure the process was spawned with the correct arguments
    expect(process.command).to.equal('test/fixtures/bin/spaces in name');
    expect(process.args).to.deep.equal([
      'spaces in arg', '--bar="more spaces"', "--baz='even more spaces'"
    ]);

    // The output should contain each argument on its own line
    let expectedOutput =
      'Argument #1: spaces in arg\n' +
      'Argument #2: --bar="more spaces"\n' +
      "Argument #3: --baz='even more spaces'\n";

    expect(process.stderr.toString()).to.equal('');
    expect(process.stdout.toString()).to.equal(expectedOutput);
    expect(process.output.toString()).to.equal(expectedOutput);
  });

  describe('failure tests', () => {
    it('should throw an error if no args are passed', () => {
      try {
        ezSpawn.sync();
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command to execute is missing.');
      }
    });

    it('should throw an error if the command is empty', () => {
      try {
        ezSpawn.sync('');
        chai.assert(false, 'no error was thrown');
      }
      catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('The command to execute is missing.');
      }
    });
  });

});
