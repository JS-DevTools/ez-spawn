'use strict';

const Process = require('./process');
const concat = require('./concat');
const normalizeArgs = require('./normalize-args');
const maybe = require('call-me-maybe');
const spawn = require('cross-spawn');

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
  let normalized = normalizeArgs(arguments);

  let command = normalized.command;
  let args = normalized.args;
  let options = normalized.options;
  let callback = normalized.callback;
  let error = normalized.error;

  if (error) {
    return maybe(callback, Promise.reject(error));
  }
  else {
    return maybe(callback, spawnPromise(command, args, options));
  }
}

/**
 * Executes the given command asynchronously, and returns the buffered
 * results via a Promise.
 *
 * @param {string} command - The command to run
 * @param {string[]} [args] - The command arguments
 * @param {object} [options] - options
 *
 * @returns {Promise<Process>}
 */
function spawnPromise (command, args, options) {
  return new Promise((resolve) => {
    // Spawn the program
    let spawnedProcess = spawn(command, args, options);

    // Begin capturing the results
    let process = new Process({
      command,
      args,
      options,
      pid: spawnedProcess.pid,
      stdout: options.encoding ? '' : new Buffer(''),
      stderr: options.encoding ? '' : new Buffer(''),
    });

    spawnedProcess.stdout.on('data', (data) => {
      process.stdout = concat(process.stdout, data);
    });

    spawnedProcess.stderr.on('data', (errorData) => {
      process.stderr = concat(process.stderr, errorData);
    });

    spawnedProcess.on('error', (error) => {
      process.error = error;

      resolve(process);
    });

    spawnedProcess.on('exit', (exitCode, signal) => {
      process.exitCode = exitCode;
      process.signal = signal;

      process.output[1] = process.stdout;
      process.output[2] = process.stderr;

      resolve(process);
    });
  });
}

