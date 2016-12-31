'use strict';

const childProcess = require('child_process');
const sinon = require('sinon');

const mocks = module.exports = {
  spawn: sinon.stub(childProcess, 'spawn', spawnStub),
  spawnSync: sinon.stub(childProcess, 'spawnSync', spawnSyncStub),

  shouldThrow: false,
};

function spawnSyncStub (command, args, options) {
  if (mocks.shouldThrow) {
    return { error: new Error('Could not start program') };
  }
  return {};
}

function spawnStub (command, args, options) {
  return {};
}
