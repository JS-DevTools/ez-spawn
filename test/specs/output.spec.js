"use strict";

const chai = require("chai");
const expect = chai.expect;
const syntaxModes = require("../fixtures/syntax-modes");
const fs = require("fs");

const echoFileBin = "test/fixtures/bin/echo-file";

const files = {
  smallTextFile: {
    path: "test/fixtures/files/small-text-file.txt",
    contents: fs.readFileSync("test/fixtures/files/small-text-file.txt"),
  },
  largeTextFile: {
    path: "test/fixtures/files/large-text-file.txt",
    contents: fs.readFileSync("test/fixtures/files/large-text-file.txt"),
  },
  imageFile: {
    path: "test/fixtures/files/image-file.jpg",
    contents: fs.readFileSync("test/fixtures/files/image-file.jpg"),
  },
};

// NOTES: Call spawn, default is buffer can pass a default encoding string 'utf-8' returns string
for (let spawn of syntaxModes) {
  describe(`process output (${spawn.name})`, () => {

    it("should return text output as a buffer", () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary output as a buffer", () => {
      return spawn(`${echoFileBin} ${files.imageFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.imageFile.contents);

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return text output as a string", () => {
      return spawn(`${echoFileBin} ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents.toString());

          // stderr should be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return a stderror output as a Buffer", () => {
      return spawn(`${echoFileBin} --stderr ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should be empty
          expect(process.stdout).to.have.lengthOf(0);

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return a stderror output as a string", () => {
      return spawn(`${echoFileBin} --stderr ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should be empty
          expect(process.stdout).to.have.lengthOf(0);

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents.toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return output and stderr as a Buffer", () => {
      return spawn(`${echoFileBin} --stdout ${files.smallTextFile.path} --stderr ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents);

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return output and stderr as a string", () => {
      return spawn(`${echoFileBin} --stdout ${files.smallTextFile.path} --stderr ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.smallTextFile.contents.toString());

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents.toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and stderr output as a Buffer", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} --stderr ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.imageFile.contents);

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and stderr output as a string", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} --stderr ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout).to.deep.equal(files.imageFile.contents.toString());

          // stderr should match the file
          expect(process.stderr).to.deep.equal(files.smallTextFile.contents.toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and text output as a Buffer", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(Buffer.concat([files.imageFile.contents, files.smallTextFile.contents]));

          // stderr be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and text output as a string", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout.toString()).to.deep.equal(Buffer.concat([files.imageFile.contents, files.smallTextFile.contents]).toString());

          // stderr be empty
          expect(process.stderr).to.have.lengthOf(0);

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });


    it("should return binary and text output, as well as multiple stderr output to a Buffer", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.largeTextFile.path} --stderr ${files.largeTextFile.path} ${files.smallTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the files
          expect(process.stdout).to.deep.equal(Buffer.concat([files.imageFile.contents, files.largeTextFile.contents]));

          // stderr to match the files
          expect(process.stderr).to.deep.equal(Buffer.concat([files.largeTextFile.contents, files.smallTextFile.contents]));

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and text output, as well as multiple stderr output to a string", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.smallTextFile.path} --stderr ${files.largeTextFile.path} ${files.smallTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout.toString()).to.deep.equal(Buffer.concat([files.imageFile.contents, files.smallTextFile.contents]).toString());

          // stderr to match the files
          expect(process.stderr.toString()).to.deep.equal(Buffer.concat([files.largeTextFile.contents, files.smallTextFile.contents]).toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and large/small text output, as well as multiple stderr output to a Buffer", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.largeTextFile.path} ${files.smallTextFile.path} --stderr ${files.largeTextFile.path} ${files.smallTextFile.path} ${files.largeTextFile.path}`)
        .then((process) => {
          // By default, stdout and stderr should be Buffers
          expect(Buffer.isBuffer(process.stdout)).to.equal(true);
          expect(Buffer.isBuffer(process.stderr)).to.equal(true);

          // stdout should match the file
          expect(process.stdout).to.deep.equal(Buffer.concat([files.imageFile.contents, files.largeTextFile.contents, files.smallTextFile.contents]));

          // stderr to match the files
          expect(process.stderr).to.deep.equal(Buffer.concat([files.largeTextFile.contents, files.smallTextFile.contents, files.largeTextFile.contents]));

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });

    it("should return binary and large/small text output, as well as multiple stderr output to a string", () => {
      return spawn(`${echoFileBin} --stdout ${files.imageFile.path} ${files.largeTextFile.path} ${files.smallTextFile.path} --stderr ${files.largeTextFile.path} ${files.smallTextFile.path} ${files.largeTextFile.path}`, { encoding: "utf8" })
        .then((process) => {
          // By default, stdout and stderr should be strings
          expect(process.stdout).to.be.a("string");
          expect(process.stderr).to.be.a("string");

          // stdout should match the file
          expect(process.stdout.toString()).to.deep.equal(Buffer.concat([files.imageFile.contents, files.largeTextFile.contents, files.smallTextFile.contents]).toString());

          // stderr to match the files
          expect(process.stderr.toString()).to.deep.equal(Buffer.concat([files.largeTextFile.contents, files.smallTextFile.contents, files.largeTextFile.contents]).toString());

          // Output should match stdout and stderr
          expect(process.output).to.have.lengthOf(3);
          expect(process.output[0]).to.be.null;
          expect(process.output[1]).to.equal(process.stdout);
          expect(process.output[2]).to.equal(process.stderr);
        });
    });
  });
}
