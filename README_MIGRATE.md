# Migration Guide

### 12.0
Security check (nsp) task in no longer provided due to the service shutdown.
1. Remove security check step from build steps.
2. Use the built in `npm audit` instead which is provided from npm v6.

### 11.0
Default file pattern of tests changed. If you have specified custom server path, 
you need to adjust the corresponding config entry respectively.

```javascript
  const config = {
      server: {
        path: 'custom_server_path/',
        test: {
          filePatterns: ['custom_server_path/**/*.spec.js']
        }
      }
  }
```

### 10.0

Copying to `dist` folder will no longer be present. You should delete every related Gulp task.

The resulting basic Gulp tasks will look like this.

```javascript
const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('./tasks.config');
const tasks = require('boar-tasks-server').getTasks(gulp, config);

gulp.task('start', function(cb) {
  runSequence(['server'], cb);
});

gulp.task('test', function(cb) {
  runSequence('server-test', cb);
});
gulp.task('style', function(cb) {
  runSequence('server-style', cb);
});

gulp.task('server', tasks.server.start);
gulp.task('server-style', tasks.server.codeStyle);
gulp.task('server-test', tasks.server.test);
```

The deployment on Codeship will no longer need a custom script, you can switch to the Heroku deployment.

You start scripts inside the `Procfile` should be modified, 
because the deployed file structure will also include the `server` folder.

```
web: node server/processes/web/index.js
```
