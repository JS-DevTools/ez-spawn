"use strict";

const syntaxModes = require("../fixtures/syntax-modes");
const chai = require("chai");
const expect = chai.expect;

for (let spawn of syntaxModes) {
  describe(`exit codes (${spawn.name})`, () => {
    it("should return normally with a status code of 0", () => {
      return spawn("test/fixtures/bin/exit-code 0")
        .then((process) => {
          // Make sure the result is NOT an error object
          expect(process).to.not.be.an.instanceOf(Error);
          expect(process.error).to.equal(undefined);
          expect(process.message).to.equal(undefined);
          expect(process.toString()).to.equal("test/fixtures/bin/exit-code 0");

          // Check the process output
          expect(process.command).to.equal("test/fixtures/bin/exit-code");
          expect(process.status).to.equal(0);
          expect(process.signal).to.equal(null);
          expect(process.stdout).to.equal("Process was exited with code 0\n");
          expect(process.stderr).to.equal("");
        });
    });

    it("should throw an error on a non-zero status code", () => {
      return spawn("test/fixtures/bin/exit-code 1 --silent")
        .then(() => {
          chai.assert(false, "An error should have been thrown, but it wasn't");
        })
        .catch((error) => {
          // Make sure the result is an error object
          expect(error).to.be.an.instanceOf(Error);
          expect(error.error).to.equal(undefined);
          expect(error.message).to.equal("test/fixtures/bin/exit-code 1 --silent exited with a status of 1.");
          expect(error.toString()).to.equal("ProcessError: test/fixtures/bin/exit-code 1 --silent exited with a status of 1.");

          // Check the process output
          expect(error.command).to.equal("test/fixtures/bin/exit-code");
          expect(error.status).to.equal(1);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("");
        });
    });

    it("should throw an error on a non-zero status code with stderr", () => {
      return spawn('test/fixtures/bin/exit-code 1 "Onoes!!!"')
        .then(() => {
          chai.assert(false, "An error should have been thrown, but it wasn't");
        })
        .catch((error) => {
          // Make sure the result is an error object
          expect(error).to.be.an.instanceOf(Error);
          expect(error.error).to.equal(undefined);
          expect(error.message).to.equal("test/fixtures/bin/exit-code 1 Onoes!!! exited with a status of 1.\n\nOnoes!!!");
          expect(error.toString()).to.equal("ProcessError: test/fixtures/bin/exit-code 1 Onoes!!! exited with a status of 1.\n\nOnoes!!!");

          // Check the process output
          expect(error.command).to.equal("test/fixtures/bin/exit-code");
          expect(error.status).to.equal(1);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("Onoes!!!\n");
        });
    });

    it("should throw an error on a non-zero status code above 128", () => {
      return spawn("test/fixtures/bin/exit-code 150")
        .then(() => {
          chai.assert(false, "An error should have been thrown, but it wasn't");
        })
        .catch((error) => {
          // Make sure the result is an error object
          expect(error).to.be.an.instanceOf(Error);
          expect(error.error).to.equal(undefined);
          expect(error.message).to.equal("test/fixtures/bin/exit-code 150 exited with a status of 150.\n\nProcess was exited with code 150");
          expect(error.toString()).to.equal("ProcessError: test/fixtures/bin/exit-code 150 exited with a status of 150.\n\nProcess was exited with code 150");

          // Check the process output
          expect(error.command).to.equal("test/fixtures/bin/exit-code");
          expect(error.status).to.equal(150);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("Process was exited with code 150\n");
        });
    });
  });
}
