'use strict';

const boarTasksServer = require('./');
const parallel = require('async-runner').parallel;
const sequence = require('async-runner').sequence;
const co = require('co');
const argv = require('yargs')
    .usage('Usage: $0 [task1] [task2] -c [config]')
    .default('c', 'tasks.config.js')
    .boolean('p')
    .boolean('s')
    .argv;

const id = `Boar task ${argv._}`;
const taskIds = argv._;

co(function* () {
  console.log(`${id} started`);
  console.time(id);
  const config = require(`${process.cwd()}/${argv.c}`);
  const boarTasks = boarTasksServer.getTasks(config);
  const tasks = taskIds.map((taskId) => () => boarTasks.server[taskId]());
  const runner = argv.parallel ? parallel : sequence;
  yield runner(tasks);
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
