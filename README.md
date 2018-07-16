# Boar Tasks for server side

[![npm version](https://badge.fury.io/js/boar-tasks-server.svg)](http://badge.fury.io/js/boar-tasks-server)
[![Dependency Status](https://david-dm.org/emartech/boar-tasks-server.svg)](https://david-dm.org/emartech/boar-tasks-server)
[![devDependency Status](https://david-dm.org/emartech/boar-tasks-server/dev-status.svg)](https://david-dm.org/emartech/boar-tasks-server#info=devDependencies)

This repository contains Gulp-based tasks to make server-side applications easier. It can be used with any server side framework.

These tasks are helpers, you have to define your build tasks in your project's `gulpfile.js`. You can find examples in our existing services or workshop material.

Usually we create a `tasks.config.js` file which is for override the default task settings.

### Sample config file

```javascript
// tasks.config.js

module.exports = {
  server: {
    environmentVariables: {
      DEBUG: 'suite-sdk,suiterequest',
      PORT: 9100,
      BASE_URL: 'http://localhost:9100',
      NODE_ENV: 'development'
    }
  }
};
```

### Sample gulpfile

```javascript
// gulpfile.js

let gulp = require('gulp');
let runSequence = require('run-sequence');
let config = require('./tasks.config');
let tasks = require('boar-tasks-server').getTasks(gulp, config);

gulp.task('start', function(cb) {
  runSequence(['server', 'server-watch'], cb);
});

gulp.task('test', tasks.server.test);

gulp.task('server', tasks.server.start);
gulp.task('server-jshint', function() { return tasks.server.jshint(); });
gulp.task('server-watch', function() { gulp.watch(tasks.config.server.filePattern) });
```

## Available tasks

### Server tasks

#### Start
Run a server with Nodemon for development purposes. It automatically restarts the server if any file changed and notifies the developer about it.

*Default configuration*

```javascript
const path = require('path');
const appRootPath = path.join(process.cwd(), 'server', 'processes', 'web');

Config.server = {
  path: 'server/',
  runnable: path.join(appRootPath, 'index.js'),
  filePattern: ['server/**/!(*.spec).{pug,js}', 'package.json'],
  watchPattern: 'server/**/*.js',
  environmentVariables: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_ROOT_PATH: appRootPath,
    IP: process.env.IP || undefined,
    PORT: process.env.PORT || 9100,
    BASE_URL: process.env.BASE_URL || 'http://localhost:9100'
  }
};
```

*Usage*

```javascript
gulp.task('server', tasks.server.start);
```

*Docker*

If you'd like to run your server in Docker and restart on file changes you have to set the `NODEMON_LEGACY_WATCH` environment variable to `true`. It forces Nodemon to use legacy change detection mode which is the only way to support Docker.



#### Test
Run all the tests found (all `*.spec.js` files) in the codebase.

*Default configuration*

```javascript
Config.server = {
  path: 'server/',
  test: {
    requires: ['co-mocha'],
    flags: ['reporter dot', 'colors'],
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV || 'test',
      APP_ROOT_PATH: process.cwd() + '/server/'
    }
  }
};
```

*Usage*

```javascript
gulp.task('test', tasks.server.test);
```



#### Run command with server environment variables
Run the specified command by spawning a child process. It sets the server environment variables from the configuration also for the child process.

*Default configuration*

```javascript
Config.server = {
  environmentVariables: {
    PORT: process.env.PORT || 9100,
    BASE_URL: process.env.BASE_URL || 'http://localhost:9100'
  }
};
```

*Usage*

```javascript
// Creating task for a job-runner
gulp.task('job-runner', function (cb) { return tasks.server.runCommand('server/processes/job-runner', cb) });
```



### Run command with test environment variables
Run the specified command by spawning a child process. It sets the test environment variables from the configuration also for the child process.

*Default configuration*

```javascript
Config.server = {
  test: {
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV || 'test',
      APP_ROOT_PATH: process.cwd() + '/server/processes/web/'
    }
  },
};
```

*Usage*

```javascript
// Creating task for a job-runner
gulp.task('job-runner', function (cb) { return tasks.server.runTestCommand('server/processes/job-runner', cb) });
```


### Run command with custom environment variables
Run the specified command by spawning a child process. It sets the given environment variables also for the child process.

*Usage*

```javascript
// Creating task for a job-runner
gulp.task('job-runner', function (cb) { return tasks.server.runEnvironmentCommand('server/processes/job-runner', { NODE_ENV: 'integration' }, cb) });
```


#### Code style
Check code style using ESLint on the selected JavaScript files.

*Default configuration*

```javascript
Config.server = {
  codeStylePattern: 'server/**/*.js'
}
```

*Usage*

```javascript
gulp.task('server-codestyle', tasks.server.codeStyle);
```



#### Template code style
Check code style on the selected template files using pug-lint.

*Default configuration*

```javascript
Config.server = {
  app: {
    templateCodeStylePattern: 'server/app/**/*.pug'
  }
}
```

*Code style rules*

Install `pug-lint-config-emarsys` to your project and create a file in your project's root called `.pug-lintrc` with the following content:

```
{
  "extends": "emarsys"
}
```

*Usage*

```javascript
gulp.task('server-template-code-style', tasks.server.templateCodeStyle);
```
