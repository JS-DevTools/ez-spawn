'use strict';

const ezSpawn = require('../../');
const mocks = require('../fixtures/mocks');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('ezSpawn.sync argument parsing', () => {

  it('should throw an error if no args are passed', () => {
    try {
      ezSpawn.sync();
      chai.assert(false, 'no error was thrown');
    }
    catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('The command to execute is missing.');
      sinon.assert.notCalled(mocks.spawnSync);
    }
  });

});
