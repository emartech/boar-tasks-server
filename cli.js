'use strict';

const boarTasksServer = require('./');
const co = require('co');
const argv = require('yargs')
    .usage('Usage: $0 -t [task]')
    .demand(['t'])
    .argv;

co(function* (){
  console.log(`${argv.t} started!`);
  const tasks = boarTasksServer.getTasks(null, {});
  yield tasks.server[argv.t]();
  console.log(`${argv.t} finished!`);
})
.then(() => {
  process.exit(0);
})
.catch((ex) => {
  console.log('something went wrong', ex.message, { stack: ex.stack });
  process.exit(1);
});
