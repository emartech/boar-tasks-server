var Config = {};

Config.build = {
  distPath: 'dist/'
};


Config.server = {
  path: 'server/',
  runnable: Config.build.distPath + 'processes/web/index.js',
  filePattern: ['!server/**/*.factory.*', '!server/**/*.spec.*', 'server/**/*.{jade,js,css,json}',  'package.json', 'trace.config.js', 'Procfile'],
  watchPattern: 'server/**/*.js',
  environmentVariables: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_ROOT_PATH: process.cwd() + '/' + Config.build.distPath,
    IP: process.env.IP || undefined,
    PORT: process.env.PORT || 9100,
    BASE_URL: process.env.BASE_URL || 'http://localhost:9100'
  },
  test: {
    requires: ['co-mocha'],
    flags: ['reporter dot', 'harmony', 'colors'],
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV || 'test',
      APP_ROOT_PATH: process.cwd() + '/' + Config.build.distPath
    }
  },
  codeStylePattern: 'server/**/*.js'
};

module.exports = Config;
