"use strict";

/**
 * This module allows us to interchangeably call any of the EZSpawn syntax modes
 * in a test.  It wraps all of the syntax modes in Promises, for consistency.
 */

const ezSpawn = require("../../");

module.exports = [syncSyntax, promiseSyntax, callbackSyntax];

/**
 * Calls {@link ezSpawn.sync}, and wraps the results in a Promise.
 */
function syncSyntax () {
  let args = arguments;

  return new Promise((resolve, reject) => {
    try {
      let result = ezSpawn.sync.apply(ezSpawn, args);
      resolve(result);
    }
    catch (error) {
      reject(error);
    }
  });
}

/**
 * Calls {@link ezSpawn.async} and returns the Promise.
 */
function promiseSyntax () {
  return ezSpawn.async.apply(ezSpawn, arguments);
}

/**
 * Calls {@link ezSpawn.async} using its callback syntax,
 * and wraps the results in a Promise.
 */
function callbackSyntax () {
  let args = Array.prototype.slice.call(arguments);

  return new Promise((resolve, reject) => {
    function callback (err, result) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    }

    args.push(callback);
    ezSpawn.async.apply(ezSpawn, args);
  });
}
