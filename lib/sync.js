'use strict';

const Process = require('./process');
const concat = require('./concat');
const normalizeArgs = require('./normalize-args');
const spawnSync = require('cross-spawn').sync;

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
  let normalized = normalizeArgs(arguments);

  let command = normalized.command;
  let args = normalized.args;
  let options = normalized.options;

  // Run the program
  let result = spawnSync(command, args, options);

  // Format the results
  let process = new Process(result);
  process.command = command;
  process.args = args;

  if (result.output) {
    process.output = result.output.reduce(concat);
  }

  return process;
}
