import * as ezSpawn from "../../lib";
import { BufferOptions, Options, Process, ProcessError } from "../../lib";

let process: Process;
let bufferProcess: Process<Buffer>;
let options: Options = { cwd: "/usr/local/bin" };
let bufferOptions: BufferOptions = { cwd: "/usr/local/bin", encoding: "buffer" };

function callback(err: Error, process: Process) {
  console.log(err, process);
}

function bufferCallback(err: Error, process: Process<Buffer>) {
  console.log(err, process);
}

export function testSyncSignatures() {
  // Sync signatures without options
  process = ezSpawn.sync('git commit -am "Fixed a bug"');
  process = ezSpawn.sync(["git", "commit", "-am", "Fixed a bug"]);
  process = ezSpawn.sync("git", ["commit", "-am", "Fixed a bug"]);
  process = ezSpawn.sync("git", "commit", "-am", "Fixed a bug");

  // Sync signatures with options
  process = ezSpawn.sync('git commit -am "Fixed a bug"', options);
  process = ezSpawn.sync(["git", "commit", "-am", "Fixed a bug"], options);
  process = ezSpawn.sync("git", ["commit", "-am", "Fixed a bug"], options);
  process = ezSpawn.sync("git", "commit", "-am", "Fixed a bug", options);

  // Sync signatures with options and encoding="buffer"
  bufferProcess = ezSpawn.sync('git commit -am "Fixed a bug"', bufferOptions);
  bufferProcess = ezSpawn.sync(["git", "commit", "-am", "Fixed a bug"], bufferOptions);
  bufferProcess = ezSpawn.sync("git", ["commit", "-am", "Fixed a bug"], bufferOptions);
  bufferProcess = ezSpawn.sync("git", "commit", "-am", "Fixed a bug", bufferOptions);
}

export async function testPromiseSignatures() {
  // Promise signatures without options
  process = await ezSpawn.async('git commit -am "Fixed a bug"');
  process = await ezSpawn.async(["git", "commit", "-am", "Fixed a bug"]);
  process = await ezSpawn.async("git", ["commit", "-am", "Fixed a bug"]);
  process = await ezSpawn.async("git", "commit", "-am", "Fixed a bug");

  // Promise signatures with options
  process = await ezSpawn.async('git commit -am "Fixed a bug"', options);
  process = await ezSpawn.async(["git", "commit", "-am", "Fixed a bug"], options);
  process = await ezSpawn.async("git", ["commit", "-am", "Fixed a bug"], options);
  process = await ezSpawn.async("git", "commit", "-am", "Fixed a bug", options);

  // Promise signatures with options and encoding="buffer"
  bufferProcess = await ezSpawn.async('git commit -am "Fixed a bug"', bufferOptions);
  bufferProcess = await ezSpawn.async(["git", "commit", "-am", "Fixed a bug"], bufferOptions);
  bufferProcess = await ezSpawn.async("git", ["commit", "-am", "Fixed a bug"], bufferOptions);
  bufferProcess = await ezSpawn.async("git", "commit", "-am", "Fixed a bug", bufferOptions);
}

export function testCallbackSignatures() {
  // Callback signatures without options
  ezSpawn.async('git commit -am "Fixed a bug"', callback);
  ezSpawn.async(["git", "commit", "-am", "Fixed a bug"], callback);
  ezSpawn.async("git", ["commit", "-am", "Fixed a bug"], callback);
  ezSpawn.async("git", "commit", "-am", "Fixed a bug", callback);

  // Callback signatures with options
  ezSpawn.async('git commit -am "Fixed a bug"', options, callback);
  ezSpawn.async(["git", "commit", "-am", "Fixed a bug"], options, callback);
  ezSpawn.async("git", ["commit", "-am", "Fixed a bug"], options, callback);
  ezSpawn.async("git", "commit", "-am", "Fixed a bug", options, callback);

  // Callback signatures with options and encoding="buffer"
  ezSpawn.async('git commit -am "Fixed a bug"', bufferOptions, bufferCallback);
  ezSpawn.async(["git", "commit", "-am", "Fixed a bug"], bufferOptions, bufferCallback);
  ezSpawn.async("git", ["commit", "-am", "Fixed a bug"], bufferOptions, bufferCallback);
  ezSpawn.async("git", "commit", "-am", "Fixed a bug", bufferOptions, bufferCallback);
}

export function testOptionsInterface() {
  options = {};
  options.encoding = "ascii";
  options.encoding = "utf8";
  options.encoding = "utf16le";
  options.encoding = "ucs2";
  options.encoding = "base64";
  options.encoding = "latin1";
  options.encoding = "binary";
  options.encoding = "hex";
  options.cwd = "/usr/local/bin";
  options.env = {
    PATH: "/usr/local/bin",   // eslint-disable-line @typescript-eslint/naming-convention
    USER: undefined,          // eslint-disable-line @typescript-eslint/naming-convention
  };
  options.argv0 = "node";
  options.stdio = "ignore";
  options.stdio = "inherit";
  options.stdio = "pipe";
  options.stdio = ["inherit", "pipe", "ipc"];
  options.input = "hello world";
  options.input = Buffer.from([]);
  options.input = new Int16Array(0);
  options.uid = 0;
  options.gid = 0;
  options.timeout = 0;
  options.killSignal = 0;
  options.killSignal = "SIGKILL";
  options.maxBuffer = 0;
  options.shell = true;
  options.shell = "bash";
  options.windowsVerbatimArguments = true;
  options.windowsHide = true;
}

export function testBufferOptionsInterface() {
  bufferOptions = { encoding: "buffer" };
  bufferOptions.cwd = "/usr/local/bin";
  bufferOptions.env = {
    PATH: "/usr/local/bin",   // eslint-disable-line @typescript-eslint/naming-convention
    USER: undefined,          // eslint-disable-line @typescript-eslint/naming-convention
  };
  bufferOptions.argv0 = "node";
  bufferOptions.stdio = "ignore";
  bufferOptions.stdio = "inherit";
  bufferOptions.stdio = "pipe";
  bufferOptions.stdio = ["inherit", "pipe", "ipc"];
  bufferOptions.input = "hello world";
  bufferOptions.input = Buffer.from([]);
  bufferOptions.input = new Int16Array(0);
  bufferOptions.uid = 0;
  bufferOptions.gid = 0;
  bufferOptions.timeout = 0;
  bufferOptions.killSignal = 0;
  bufferOptions.killSignal = "SIGKILL";
  bufferOptions.maxBuffer = 0;
  bufferOptions.shell = true;
  bufferOptions.shell = "bash";
  bufferOptions.windowsVerbatimArguments = true;
  bufferOptions.windowsHide = true;
}

export function testProcessInterface() {
  process.command.trim();                              // string
  process.args.forEach((arg) => arg.trim());          // array of strings
  process.pid.toPrecision();                          // number
  process.stdout.trim();                              // string
  process.stderr.trim();                              // string
  process.output[0].trim();                           // string
  process.output[1].trim();                           // string
  process.output[2].trim();                           // string
  process.status.toPrecision();                       // number
  process.signal.trim();                              // string
  process.toString().trim();                          // string

  bufferProcess.command.trim();                        // string
  bufferProcess.args.forEach((arg) => arg.trim());    // array of strings
  bufferProcess.pid.toPrecision();                    // number
  bufferProcess.stdout.fill(0);                       // Buffer
  bufferProcess.stderr.fill(0);                       // Buffer
  bufferProcess.output[0].fill(0);                    // Buffer
  bufferProcess.output[1].fill(0);                    // Buffer
  bufferProcess.output[2].fill(0);                    // Buffer
  bufferProcess.status.toPrecision();                 // number
  bufferProcess.signal.trim();                        // string
  bufferProcess.toString().trim();                    // string
}

export function testProcessErrorInterface() {
  let error: ProcessError;
  error.name.trim();                                // string
  error.message.trim();                             // string
  error.stack.trim();                               // string
  error.command.trim();                              // string
  error.args.forEach((arg) => arg.trim());          // array of strings
  error.pid.toPrecision();                          // number
  error.stdout.trim();                              // string
  error.stderr.trim();                              // string
  error.output[0].trim();                           // string
  error.output[1].trim();                           // string
  error.output[2].trim();                           // string
  error.status.toPrecision();                       // number
  error.signal.trim();                              // string
  error.toString().trim();                          // string

  let bufferError: ProcessError<Buffer>;
  error.name.trim();                                // string
  error.message.trim();                             // string
  error.stack.trim();                               // string
  bufferError.command.trim();                        // string
  bufferError.args.forEach((arg) => arg.trim());    // array of strings
  bufferError.pid.toPrecision();                    // number
  bufferError.stdout.fill(0);                       // Buffer
  bufferError.stderr.fill(0);                       // Buffer
  bufferError.output[0].fill(0);                    // Buffer
  bufferError.output[1].fill(0);                    // Buffer
  bufferError.output[2].fill(0);                    // Buffer
  bufferError.status.toPrecision();                 // number
  bufferError.signal.trim();                        // string
  bufferError.toString().trim();                    // string
}
