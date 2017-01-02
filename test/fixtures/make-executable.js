'use strict';

/**
 *
 * This script makes sure that all of our test binaries are executable.
 *
 */
const fs = require('fs');
const path = require('path');

let binPath = path.join(__dirname, 'bin');
let binaries = fs.readdirSync(binPath);

for (let bin of binaries) {
  bin = path.join(binPath, bin);
  fs.chmodSync(bin, '0777');
}
