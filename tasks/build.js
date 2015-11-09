'use strict';

module.exports = function (gulp, config) {

  return {

    clean: function (cb) {
      require('del')([config.build.distPath + '**/*'], cb);
    }

  };

};
