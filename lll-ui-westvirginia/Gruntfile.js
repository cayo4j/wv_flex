var gruntCfg = require('./config/grunt.conf.json');


module.exports = function (grunt) {

    var cfgKeys = Object.keys(gruntCfg);

    cfgKeys.forEach(function(cfgKey) {
        grunt.config(cfgKey, gruntCfg[cfgKey]);
    });
	
    require('load-grunt-config')(grunt);
	
}