'use strict';

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
     * The command that was used to spawn the process
     *
     * @type {string}
     */
    this.command = props.command;

    /**
     * The command-line arguments that were passed to the process.
     *
     * @type {string[]}
     */
    this.args = props.args;

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
     * All program output [stdin, stdout, stderr]
     *
     * @type {Buffer[]|string[]}
     */
    this.output = props.output || [null, this.stdout, this.stderr];

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
   * Returns the full command and arguments used to spawn the process
   *
   * @type {string}
   */
  toString () {
    let string = this.command;

    for (let arg of this.args) {
      // Escape quotes
      arg = arg.replace(/"/g, '\\"');

      if (arg.indexOf(' ') >= 0) {
        // Add quotes if the arg contains whitespace
        string += ` "${arg}"`;
      }
      else {
        string += ` ${arg}`;
      }
    }

    return string;
  }
};

