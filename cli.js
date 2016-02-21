'use strict';

const boarTasksServer = require('./');
const co = require('co');
const argv = require('yargs')
    .usage('Usage: $0 -t [task] -c [config]')
    .default('c', 'tasks.config.js')
    .demand(['t'])
    .argv;

const id = `Boar task '${argv.t}`;
co(function* () {
  console.time(id);
  const config = require(`${process.cwd()}/${argv.c}`);
  const tasks = boarTasksServer.getTasks(null, config);
  yield tasks.server[argv.t]();
  console.timeEnd(id);
})
.then(() => {
  process.exit(0);
})
.catch((ex) => {
  console.timeEnd(id);
  console.log(`${id} failed`, ex.message, { stack: ex.stack });
  process.exit(1);
});
