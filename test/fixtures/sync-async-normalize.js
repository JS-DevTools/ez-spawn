'use strict';

const ezSpawn = require('../../');

module.exports = function () {
  if (global.isAsync) {
    return ezSpawn.async.apply(this, arguments);
  }

  else {
    return new Promise((resolve) => {
      resolve(ezSpawn.sync.apply(this, arguments));
    });
  }
};
