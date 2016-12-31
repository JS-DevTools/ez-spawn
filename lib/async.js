'use strict';

const Process = require('./process');
const concat = require('./concat');
const normalizeArgs = require('./normalize-args');
const maybe = require('call-me-maybe');
const spawn = require('child_process').spawn;

module.exports = async;

/**
 * Executes the given command asynchronously, and returns the buffered
 * results via a callback or Promise.
 *
 * @param {string|string[]} command - The command to run
 * @param {string|string[]} [args] - The command arguments
 * @param {object} [options] - options
 * @param {function} [callback] - callback that will receive the results
 *
 * @returns {Promise<Process>|undefined}
 * Returns a Promise if no callback is given. The promise resolves with
 * a {@link Process} object.
 *
 * @see {@link normalizeArgs} for argument details
 */
function async () {
  // Normalize the function arguments
  let { command, args, options, callback } = normalizeArgs(arguments);

  return maybe(callback, new Promise((resolve) => {
    // Spawn the program
    let spawnedProcess = spawn(command, args, options);

    // Begin capturing the results
    let process = new Process({
      argv: [command].concat(args),
      pid: spawnedProcess.pid,
    });

    spawnedProcess.stdout.on('data', (data) => {
      process.output = concat(process.output, data);
      process.stdout = concat(process.stdout, data);
    });

    spawnedProcess.stderr.on('data', (errorData) => {
      process.output = concat(process.output, errorData);
      process.stderr = concat(process.stderr, errorData);
    });

    spawnedProcess.on('error', (error) => {
      process.error = error;

      resolve(process);
    });

    spawnedProcess.on('exit', (exitCode, signal) => {
      process.exitCode = exitCode;
      process.signal = signal;

      resolve(process);
    });
  }));
}

