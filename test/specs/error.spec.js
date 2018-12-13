"use strict";

const chai = require("chai");
const expect = chai.expect;
const syntaxModes = require("../fixtures/syntax-modes");

for (let spawn of syntaxModes) {
  describe(`error spawning (${spawn.name})`, () => {

    it("should set `process.error` when a command is not found", () => {
      return spawn("test/fixtures/bin/wrong-command")
        .then((process) => {
          expect(process.error).to.be.an.instanceOf(Error);
          expect(process.error.message).to.contain("test/fixtures/bin/wrong-command ENOENT");
        });
    });

    it("should return an error on a non-executable file", () => {
      return spawn("test/fixtures/bin/text-file")
        .then((process) => {
          expect(process.error).to.be.an.instanceOf(Error);
          expect(process.error.message).to.contain("test/fixtures/bin/text-file ENOENT");
        });
    });

  });
}
