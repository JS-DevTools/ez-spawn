'use strict';

const ezSpawn = require('../../');
const expect = require('chai').expect;

describe('ez-spawn async function', () => {

  describe('When a callback is specified in the parameters', () => {

    it('should return a process instance on a successful call', (done) => {
      ezSpawn.async('test/fixtures/bin/echo-args', (error, process) => {
        expect(process.command).to.equal('test/fixtures/bin/echo-args');
        done();
      });
    });

    it('should return a process instance on an unsuccessful call', (done) => {
      ezSpawn.async('does-not-exist', (error, process) => {
        expect(process.command).to.equal('does-not-exist');
        done();
      });
    });
  });

  describe('When a callback is not specifed in the parameters', () => {
    it('should resolve the returned promise on a successful call', () => {
      let promise = ezSpawn.async('test/fixtures/bin/echo-args');

      return promise.then((process) => {
        expect(process.command).to.equal('test/fixtures/bin/echo-args');
      });

    });

    it('should resolve the returned promise on an unsuccessful call', () => {
      let promise = ezSpawn.async('does-not-exist');

      return promise.then((process) => {
        expect(process.command).to.equal('does-not-exist');
      });
    });
  });
});
