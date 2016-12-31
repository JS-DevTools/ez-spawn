'use strict';

const path = require('path');
const concat = require('./concat');

/**
 * An instance of this class is returned by {@link sync} and {@link async}.
 * It contains information about how the process was spawned, how it exited, and its output.
 */
module.exports = class Process {
  /**
   * @param {object} props - Initial property values
   */
  constructor (props) {
    /**
     * The command and arguments used to spawn the process
     *
     * @type {string[]}
     */
    this.argv = props.argv;

    /**
     * The numeric process ID assigned by the operating system
     *
     * @type {number}
     */
    this.pid = props.pid;

    /**
     * The process's standard output
     *
     * @type {Buffer|string}
     */
    this.stdout = props.stdout;

    /**
     * The process's error output
     *
     * @type {Buffer|string}
     */
    this.stderr = props.stderr;

    /**
     * All program output (stdout + stderr)
     *
     * @type {Buffer|string}
     */
    this.output = props.output || concat(props.stdout, props.stderr);

    /**
     * The process's exit code
     *
     * @type {number}
     */
    this.exitCode = props.exitCode || props.status;

    /**
     * The signal used to kill the process, if applicable
     *
     * @type {string}
     */
    this.signal = props.signal;

    /**
     * The error that occurred while spawning or killing the process, if any.
     *
     * @type {?Error}
     */
    this.error = props.error;
  }

  /**
   * The program name
   *
   * @type {string}
   */
  get name () {
    return path.basename(this.argv[0]);
  }

  /**
   * The full command used to spawn the process
   *
   * @type {string}
   */
  get command () {
    return this.argv.map(arg => {
      // Escape quotes
      arg = arg.replace(/"/g, '\\"');

      // Add quotes if the arg contains whitespace
      if (arg.indexOf(' ') >= 0) {
        arg = `"${arg}"`;
      }
    }).join(' ');
  }
};

