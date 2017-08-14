'use strict';

const path = require('path');

const appRootPath = path.join(process.cwd(), 'server', 'processes', 'web');

module.exports = {
  server: {
    path: 'server/',
    runnable: path.join(appRootPath, 'index.js'),
    watchPattern: 'server/**/*.js',
    environmentVariables: {
      NODE_ENV: 'development',
      APP_ROOT_PATH: appRootPath,
      IP: undefined,
      PORT: 9100,
      BASE_URL: 'http://localhost:9100'
    },
    test: {
      requires: ['co-mocha'],
      flags: ['reporter dot', 'colors'],
      environmentVariables: {
        NODE_ENV: process.env.NODE_ENV || 'test',
        APP_ROOT_PATH: appRootPath
      }
    },
    codeStylePattern: 'server/**/*.js',
    templateCodeStylePattern: 'server/**/*.pug'
  }
};
