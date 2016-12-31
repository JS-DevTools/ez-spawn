'use strict';

module.exports = concat;

/**
 * Concatenates two strings or two Buffers.
 *
 * @param {Buffer|string} a
 * @param {Buffer|string} b
 * @returns {Buffer|string}
 */
function concat (a, b) {
  let aIsBuffer = Buffer.isBuffer(a);
  let bIsBuffer = Buffer.isBuffer(b);

  if (aIsBuffer || bIsBuffer) {
    if (!aIsBuffer) {
      a = new Buffer(a);
    }
    else if (!bIsBuffer) {
      b = new Buffer(b);
    }

    return Buffer.concat([a, b]);
  }
  else {
    if (a && b) {
      return `${a}${b}`;
    }
    else {
      return a || b;
    }
  }
}
