"use strict";

module.exports = concat;

/**
 * Concatenates two strings or two Buffers.
 *
 * @param {Buffer|string} [a]
 * @param {Buffer|string} [b]
 * @returns {Buffer|string}
 */
function concat (a, b) {
  if (a === undefined || a === null) {
    a = "";
  }

  if (b === undefined || b === null) {
    b = "";
  }

  if (Buffer.isBuffer(a)) {
    if (!Buffer.isBuffer(b)) {
      b = new Buffer(b);
    }

    return Buffer.concat([a, b]);
  }
  else {
    if (a && b) {
      return `${a}${b}`;
    }
    else {
      return `${a || b}`;
    }
  }
}
