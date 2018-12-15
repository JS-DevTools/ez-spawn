"use strict";

const chai = require("chai");
const expect = chai.expect;
const syntaxModes = require("../fixtures/syntax-modes");

for (let spawn of syntaxModes) {
  describe("error handling", () => {
    it("should throw an error if no args are passed", () => {
      return spawn()
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute is missing.");
        });
    });

    it("should throw an error if the command is empty", () => {
      return spawn("")
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute is missing.");
        });
    });

    it("should throw and error if the command is not a string", () => {
      return spawn({}, "args")
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute should be a string, not an Object.");
        });
    });

    it("should throw an error if the command args are not strings or arrays", () => {
      return spawn("test/fixtures/bin/echo-args", ["--foo", {}])
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command arguments should be strings, but argument #2 is an Object.");
        });
    });

    describe("error while spawning the process", () => {
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
  });
}
