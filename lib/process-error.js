"use strict";

/**
 * An instance of this class is returned by {@link sync} and {@link async} when the process exits
 * with a non-zero status code.
 */
module.exports = class ProcessError extends Error {
  constructor (process) {
    if (process.stderr.length > 0) {
      super(process.stderr.toString().trim());
    }
    else {
      super(`${process.toString()} exited with a status of ${process.status}.`);
    }

    Object.assign(this, process);
    this.name = ProcessError.name;
  }
};
