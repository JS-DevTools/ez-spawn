"use strict";

const chai = require("chai");
const expect = chai.expect;
const syntaxModes = require("../fixtures/syntax-modes");
const fs = require("fs");

const echoFileBin = "test/fixtures/bin/echo-file";

const files = {
  smallTextFile: {
    path: "test/fixtures/files/small-text-file.txt",
    buffer: fs.readFileSync("test/fixtures/files/small-text-file.txt"),
    text: fs.readFileSync("test/fixtures/files/small-text-file.txt", "utf8"),
  },
  largeTextFile: {
    path: "test/fixtures/files/large-text-file.txt",
    buffer: fs.readFileSync("test/fixtures/files/large-text-file.txt"),
    text: fs.readFileSync("test/fixtures/files/large-text-file.txt", "utf8"),
  },
  imageFile: {
    path: "test/fixtures/files/image-file.jpg",
    buffer: fs.readFileSync("test/fixtures/files/image-file.jpg"),
  },
};

for (let spawn of syntaxModes) {
  describe(`process output (${spawn.name})`, () => {

    it("should return stdout as text", () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`)
        .then((process) => {
          // stdout should match the file
          expect(process.stdout).to.equal(files.smallTextFile.text);

          // stderr should be empty
          expect(process.stderr).to.be.a("string").and.empty;

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return stdout as a buffer", () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`, { encoding: "buffer" })
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file contents
          expect(process.stdout).to.deep.equal(files.smallTextFile.buffer);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return an image via stdout as a buffer", () => {
      return spawn(`${echoFileBin} ${files.imageFile.path}`, { encoding: "buffer" })
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file contents
          expect(process.stdout).to.deep.equal(files.imageFile.buffer);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return stderr as text", () => {
      return spawn(`${echoFileBin} --stderr ${files.smallTextFile.path}`)
        .then((process) => {
          // stdout should be empty
          expect(process.stdout).to.be.a("string").and.empty;

          // stderr should match the file contents
          expect(process.stderr).to.equal(files.smallTextFile.text);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return stderr as a buffer", () => {
      return spawn(`${echoFileBin} --stderr ${files.smallTextFile.path}`, { encoding: "buffer" })
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should be empty
          expect(process.stdout).to.have.lengthOf(0);

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.buffer);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return stdout and stderr as text", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.smallTextFile.path} --stderr ${files.smallTextFile.path}`
      )
        .then((process) => {
          // stdout should match the file contents
          expect(process.stdout).to.equal(files.smallTextFile.text);

          // stderr should match the file contents
          expect(process.stderr).to.equal(files.smallTextFile.text);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return stdout and stderr as buffers", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.smallTextFile.path} --stderr ${files.smallTextFile.path}`,
        { encoding: "buffer" }
      )
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file contents
          expect(process.stdout).to.deep.equal(files.smallTextFile.buffer);

          // stderr should match the file contents
          expect(process.stderr).to.deep.equal(files.smallTextFile.buffer);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return an image via stdout and stderr as buffers", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.imageFile.path} --stderr ${files.smallTextFile.path}`,
        { encoding: "buffer" }
      )
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the image file contents
          expect(process.stdout).to.deep.equal(files.imageFile.buffer);

          // stderr should match the text file contents
          expect(process.stderr).to.deep.equal(files.smallTextFile.buffer);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should concatenate multiple stdout strings", () => {
      return spawn(`${echoFileBin} --stdout ${files.smallTextFile.path} ${files.smallTextFile.path}`)
        .then((process) => {
          // stdout should have two copies of the file contents
          expect(process.stdout).to.equal(files.smallTextFile.text + files.smallTextFile.text);

          // stderr be empty
          expect(process.stderr).to.be.a("string").and.empty;

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should concatenate multiple stdout buffers", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.imageFile.path} ${files.smallTextFile.path}`,
        { encoding: "buffer" }
      )
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should contain the image file contents and the text file contents
          expect(process.stdout).to.deep.equal(Buffer.concat([
            files.imageFile.buffer,
            files.smallTextFile.buffer
          ]));

          // stderr be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });


    it("should concatenate multiple stdout and stderr strings", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.smallTextFile.path} ${files.largeTextFile.path}` +
          ` --stderr ${files.largeTextFile.path} ${files.smallTextFile.path}`
      )
        .then((process) => {
          // stdout should be the concatenated contents of both text files
          expect(process.stdout).to.equal(files.smallTextFile.text + files.largeTextFile.text);

          // stderr to be the concatenated contents of both text files
          expect(process.stderr).to.equal(files.largeTextFile.text + files.smallTextFile.text);

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should concatenate multiple stdout and stderr buffers", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.imageFile.path} ${files.smallTextFile.path}` +
          ` --stderr ${files.smallTextFile.path} ${files.imageFile.path}`,
        { encoding: "buffer" }
      )
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should contain the image file contents and the text file contents
          expect(process.stdout).to.deep.equal(Buffer.concat([
            files.imageFile.buffer,
            files.smallTextFile.buffer
          ]));

          // stderr should contain the image file contents and the text file contents
          expect(process.stderr).to.deep.equal(Buffer.concat([
            files.smallTextFile.buffer,
            files.imageFile.buffer
          ]));

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should support LOTS of text output", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.largeTextFile.path} ${files.largeTextFile.path} ${files.smallTextFile.path}` +
          ` --stderr ${files.largeTextFile.path} ${files.smallTextFile.path} ${files.largeTextFile.path}`
      )
        .then((process) => {
          // stdout should contain the contents of all three files
          expect(process.stdout).to.equal(
            files.largeTextFile.text + files.largeTextFile.text + files.smallTextFile.text
          );

          // stderr should contain the contents of all three files
          expect(process.stderr).to.equal(
            files.largeTextFile.text + files.smallTextFile.text + files.largeTextFile.text
          );

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should support LOTS of binary output", () => {
      return spawn(
        `${echoFileBin} --stdout ${files.imageFile.path} ${files.largeTextFile.path} ${files.smallTextFile.path}` +
          ` --stderr ${files.largeTextFile.path} ${files.smallTextFile.path} ${files.imageFile.path}`,
        { encoding: "buffer" }
      )
        .then((process) => {
          // stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should contain the contents of all three files
          expect(process.stdout).to.deep.equal(Buffer.concat([
            files.imageFile.buffer,
            files.largeTextFile.buffer,
            files.smallTextFile.buffer
          ]));

          // stderr should contain the contents of all three files
          expect(process.stderr).to.deep.equal(Buffer.concat([
            files.largeTextFile.buffer,
            files.smallTextFile.buffer,
            files.imageFile.buffer
          ]));

          // Output should match stdout and stderr
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });
  });
}
