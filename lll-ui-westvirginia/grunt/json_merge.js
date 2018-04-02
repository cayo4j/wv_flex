/**
* @ngdoc overview
* @name json_merge.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var devPath = grunt.config('devPath');
    var distPath = grunt.config('distPath');
    var componentsFolderPath = grunt.config('componentsFolderPath');

    var configObj = {
        dev: {
            files: {}
        },
        dist: {
            files: {}
        }
    };

    configObj.dev.files[devPath+'/config/lll-app.conf.json'] = [componentsFolderPath+'/**/lll-*.conf.json'];
    configObj.dist.files[distPath+'/config/lll-app.conf.json'] = [componentsFolderPath+'/**/lll-*.conf.json'];

    return configObj;
}