// 'use strict';

// const ezSpawn = require('../../');
// const promisify = require('./sync-async-normalize');
// const path = require('path');
// const chai = require('chai');
// const expect = chai.expect;

// [ezSpawn.async, promisify(ezSpawn.sync)].forEach(spawn => {
//   describe('When a process finishes successfully', () => {
//     it('should return an exit code of 0', () => {
//       return spawn(path.join(__dirname, 'bin/exit-code 0'))
//         .then((process) => {
//           // Make sure the process was spawned without any arguments
//           expect(process.command).to.equal(path.join(__dirname, 'bin/exit-code'));
//           expect(process.exitCode).to.equal(0);
//         });
//     });
//   });

//   describe('When a process fails', () => {

//     it('should return an exit code of 1', () => {
//       return syncAsync(path.join(__dirname, 'bin/exit-code 1'))
//         .then((process) => {
//           // Make sure the process was spawned without any arguments
//           expect(process.command).to.equal(path.join(__dirname, 'bin/exit-code'));
//           expect(process.exitCode).to.equal(1);
//         });
//     });

//     it('should return an exit code of 2', () => {
//       return syncAsync(path.join(__dirname, 'bin/exit-code 2'))
//         .then((process) => {
//           // Make sure the process was spawned without any arguments
//           expect(process.command).to.equal(path.join(__dirname, 'bin/exit-code'));
//           expect(process.exitCode).to.equal(2);
//         });
//     });

//     it('should return an exit code > 128', () =>{
//       return syncAsync(path.join(__dirname, 'bin/exit-code 129'))
//         .then((process) => {
//           // Make sure the process was spawned without any arguments
//           expect(process.command).to.equal(path.join(__dirname, 'bin/exit-code'));
//           expect(process.exitCode).to.equal(129);
//         });
//     });
//   });

// };
