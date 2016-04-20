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

gulp.task('build', ['build-clean'], function(cb) {
  runSequence(['server-copy'], cb);
});

gulp.task('start', ['build'], function(cb) {
  runSequence(['server', 'server-watch'], cb);
});

gulp.task('test', tasks.server.test);

gulp.task('build-clean', function(cb) { tasks.build.clean(cb); });
gulp.task('server', tasks.server.start);
gulp.task('server-copy', function() { return tasks.server.copy(false); });
gulp.task('server-copy-only-changed', function () { return tasks.server.copy(true); });
gulp.task('server-jshint', function() { return tasks.server.jshint(); });
gulp.task('server-watch', function() { gulp.watch(tasks.config.server.filePattern, ['server-copy-only-changed']) });
```

## Available tasks

### Build tasks

#### Clean
It is used to remove files from the build target directory.



### Server tasks

#### Start
Run a server with Nodemon for development purposes. It automatically restarts the server if any file in the `dist` folder is changed and notifies the developer about it.

*Default configuration*

```javascript
Config.build = {
  distPath: 'dist/'
};

Config.server = {
  path: 'server/',
  runnable: Config.build.distPath + 'server.js',
  filePattern: ['server/**/!(*.spec).{jade,js}', 'package.json'],
  watchPattern: 'server/**/*.js',
  environmentVariables: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_ROOT_PATH: process.cwd() + '/' + Config.build.distPath,
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



#### Copy
Copy files from the server source to the `dist` folder.

*Default configuration*

```javascript
Config.build = {
  distPath: 'dist/'
};

Config.server = {
  filePattern: ['server/**/!(*.spec).{jade,js}', 'package.json']
};
```

*Usage*

```javascript
gulp.task('server-copy', function() { return tasks.server.copy(false); });

// If you want to copy only the changed files
gulp.task('server-copy-only-changed', function () { return tasks.server.copy(true); });
```



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
      APP_ROOT_PATH: process.cwd() + '/' + Config.build.distPath
    }
  }
};
```

*Usage*

```javascript
gulp.task('server-copy', function() { return tasks.server.copy(false); });

// If you want to copy only the changed files
gulp.task('server-copy-only-changed', function () { return tasks.server.copy(true); });
```



#### Run command
Run the specified command by spawning a child process. It sets the environment variables from the configuration also for the child process.

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
    templateCodeStylePattern: 'server/app/**/*.jade'
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



#### Security checks
Check package.json dependencies section against known vulnerable libraries. This will only generate warnings on the console.

*Usage*

```javascript
gulp.task('nsp', function(cb) { tasks.server.nsp(__dirname + '/package.json', cb) });
```
