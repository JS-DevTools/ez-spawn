"use strict";

const chai = require("chai");
const expect = chai.expect;
const syntaxModes = require("../fixtures/syntax-modes");
const isWindows = process.platform === "win32";

for (let spawn of syntaxModes) {
  describe(`error handling (${spawn.name})`, () => {
    it("should throw an error if no args are passed", () => {
      return spawn()
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          // Verify the error
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute is missing.");
          expect(error.toString()).to.equal("Error: The command to execute is missing.");

          // Check the process info
          expect(error.command).to.equal("");
          expect(error.args).to.deep.equal([]);
          expect(error.status).to.equal(null);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("");
        });
    });

    it("should throw an error if the command is empty", () => {
      return spawn("")
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          // Verify the error
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute is missing.");
          expect(error.toString()).to.equal("Error: The command to execute is missing.");

          // Check the process info
          expect(error.command).to.equal("");
          expect(error.args).to.deep.equal([]);
          expect(error.status).to.equal(null);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("");
        });
    });

    it("should throw and error if the command is not a string", () => {
      return spawn({}, "--foo", "--bar")
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          // Verify the error
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command to execute should be a string, not an Object.");
          expect(error.toString()).to.equal("Error: The command to execute should be a string, not an Object.");

          // Check the process info
          expect(error.command).to.equal("[object Object]");
          expect(error.args).to.deep.equal(["--foo", "--bar"]);
          expect(error.status).to.equal(null);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("");
        });
    });

    it("should throw an error if the command args are not strings or arrays", () => {
      return spawn("test/fixtures/bin/echo-args", ["--foo", {}])
        .then(() => {
          chai.assert(false, "no error was thrown");
        })
        .catch(error => {
          // Verify the error
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal("The command arguments should be strings, but argument #2 is an Object.");
          expect(error.toString()).to.equal("Error: The command arguments should be strings, but argument #2 is an Object.");

          // Check the process info
          expect(error.command).to.equal("test/fixtures/bin/echo-args");
          expect(error.args).to.deep.equal(["--foo", "[object Object]"]);
          expect(error.status).to.equal(null);
          expect(error.signal).to.equal(null);
          expect(error.stdout).to.equal("");
          expect(error.stderr).to.equal("");
        });
    });

    describe("error while spawning the process", () => {
      it("should throw an error when a command is not found", () => {
        return spawn("test/fixtures/bin/wrong-command --foo --bar")
          .then(() => {
            chai.assert(false, "no error was thrown");
          })
          .catch(error => {
            // Verify the error
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain("test/fixtures/bin/wrong-command ENOENT");
            expect(error.toString()).to.contain("test/fixtures/bin/wrong-command ENOENT");

            // Check the process info
            expect(error.command).to.equal("test/fixtures/bin/wrong-command");
            expect(error.args).to.deep.equal(["--foo", "--bar"]);

            if (spawn.name === "syncSyntax" && isWindows) {
              // On Windows, cross-spawn tries to run the command via "cmd", so it has an exit code
              expect(error.status).to.equal(1);
            }
            else {
              expect(error.status).to.equal(null);
            }

            expect(error.signal).to.equal(null);
            expect(error.stdout).to.equal("");

            if (isWindows) {
              // Windows prints an error message like, "wrong-command is not a valid command"
              expect(error.stderr).to.contain("wrong-command");
            }
            else {
              expect(error.stderr).to.equal("");
            }
          });
      });

      it("should return an error on a non-executable file", () => {
        return spawn("test/fixtures/bin/text-file --foo --bar")
          .then(() => {
            chai.assert(false, "no error was thrown");
          })
          .catch(error => {
            // Verify the error
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain("test/fixtures/bin/text-file ENOENT");
            expect(error.toString()).to.contain("test/fixtures/bin/text-file ENOENT");

            // Check the process info
            expect(error.command).to.equal("test/fixtures/bin/text-file");
            expect(error.args).to.deep.equal(["--foo", "--bar"]);

            if (spawn.name === "syncSyntax" && isWindows) {
              // On Windows, cross-spawn tries to run the command via "cmd", so it has an exit code
              expect(error.status).to.equal(1);
            }
            else {
              expect(error.status).to.equal(null);
            }

            expect(error.signal).to.equal(null);
            expect(error.stdout).to.equal("");

            if (isWindows) {
              // Windows prints an error message like, "text-file is not a valid command"
              expect(error.stderr).to.contain("text-file");
            }
            else {
              expect(error.stderr).to.equal("");
            }
          });
      });
    });
  });
}
