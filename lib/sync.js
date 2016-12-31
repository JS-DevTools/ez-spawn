'use strict';

const Process = require('./process');
const normalizeArgs = require('./normalize-args');
const spawnSync = require('child_process').spawnSync;

module.exports = sync;

/**
 * Executes the given command synchronously, and returns the buffered results.
 *
 * @param {string|string[]} command - The command to run
 * @param {string|string[]} [args] - The command arguments
 * @param {object} [options] - options
 * @returns {Process}
 *
 * @see {@link normalizeArgs} for argument details
 */
function sync () {
  // Normalize the function arguments
  let { command, args, options } = normalizeArgs(arguments);

  // Run the program
  let result = spawnSync(command, args, options);

  // Format the results
  let process = new Process(result);
  process.argv = [command].concat(args);
  return process;
}
