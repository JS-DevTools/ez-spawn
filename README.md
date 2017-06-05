EZ-Spawn
=======================

Simple, consistent sync/async process spawning

[![Build Status](https://api.travis-ci.org/rkrauskopf/ez-spawn.svg?branch=master)](https://travis-ci.org/rkrauskopf/ez-spawn)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/rkrauskopf/ez-spawn?svg=true&branch=master&failingText=Windows%20build%20failing&passingText=Windows%20build%20passing)](https://ci.appveyor.com/project/rkrauskopf/ez-spawn/branch/master)

[![Coverage Status](https://coveralls.io/repos/github/rkrauskopf/ez-spawn/badge.svg?branch=master)](https://coveralls.io/github/rkrauskopf/ez-spawn?branch=master)
[![Codacy Score](https://api.codacy.com/project/badge/Grade/aa187e0355154fc59b97bdaa2482006c)](https://www.codacy.com/public/jamesmessinger/ez-spawn)
[![Inline docs](http://inch-ci.org/github/rkrauskopf/ez-spawn.svg?branch=master&style=shields)](http://inch-ci.org/github/rkrauskopf/ez-spawn)
[![Dependencies](https://david-dm.org/rkrauskopf/ez-spawn.svg)](https://david-dm.org/rkrauskopf/ez-spawn)

[![npm](https://img.shields.io/npm/v/ez-spawn.svg?maxAge=43200)](https://www.npmjs.com/package/ez-spawn)
[![License](https://img.shields.io/npm/l/ez-spawn.svg?maxAge=2592000)](LICENSE)


Features
--------------------------
* Normalizes the results of [spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) and [spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) calls through the `async` and `sync` functions that ez-spawn provides.
* Normalizes the arguments passed into the `spawn` and `spawnSync`
* Both return the same process object no matter how it is called.

* Tested on Mac, Linux, and Windows as well as Node v4-7



Example
--------------------------

```javascript
let sync = require('ez-spawn').sync;
let async = require('ez-spawn').async;

// Make a synchronous call
let process = sync('ls', '-al');

//Make an asynchronous call that accepts a callback
async('ls', '-a' '-l', (process) => {
  console.log(process.status);
  //Etc...
});

//Make an asynchronous call that returns a promise
async('ls -al')
  .then((process) => {
    console.log(process.stdout);
    //Etc...
  })
  .catch((err) => {
    //Etc...
  })

```

Installation
--------------------------
#### Node
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

```bash
npm install ez-spawn
```

Then require it in your code:

```javascript
let async = require("ez-spawn").async;
let sync = require("ez-spawn").sync;
```


API
--------------------------
### `sync(command, [arguments], [options])`
Synchronously spawns a process and returns a `Process` object

* `command` - The command string to be executed.
* `arguments` - _(optional)_ An array or a series of individual string parameters that are the arguments to be associated with the `command` parameter.
* `options` - _(optional)_ The [spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) options object.

### `async(command, [arguments], [options], callback?)`
Asynchronously spawns a process and returns a promise or a callback if specified that contains a `Process` object.

* `command` - The command string to be executed.
* `arguments` - _(optional)_ An array or a series of individual string parameters that are the arguments to be associated with the `command` parameter.
* `options` - _(optional)_ The [spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) options object.
* `callback` - _(optional)_ If a callback is not specified then spawned process results are returned as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### `Process`
Both async and sync both return a `Process` object that contains the following properties. It mirrors the object returned by [spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options).

* `command` - The command that was used to spawn the process.
* `args` - The command-line arguments that were passed to the process.
* `pid` - The numeric process ID assigned by the operating system.
* `stdout` - The process's standard output.
* `stderr` - The process's error output.
* `output` - All program output [stdin, stdout, stderr].
* `exitCode` - The process's exit code.
* `signal` - The signal used to kill the process, if applicable.
* `error` - The error that occurred while spawning or killing the process, if any.
* `toString()` - Returns the full command and arguments used to spawn the process.



Contributing
--------------------------
We welcome any contributions, enhancements, and bug-fixes. [File an issue](https://github.com/rkrauskopf/ez-spawn/issues) on GitHub and [submit a pull request](https://github.com/rkrauskopf/ez-spawn/pulls).

#### Building/Testing
To build/test the project locally on your computer:

1. __Clone this repo__<br>
`git clone hhttps://github.com/rkrauskopf/ez-spawn.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the tests__<br>
`npm test`


License
--------------------------
ez-spawn is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.
