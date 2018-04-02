/**
* @ngdoc overview
* @name build.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var jspm = require('jspm');
    var distPath = grunt.config('distPath');
    var jspmCfg = grunt.config('jspm');
    var vendorsNg = jspmCfg.vendorsNg;
    var vendorsRest = jspmCfg.vendors;
    var buildOptions = {
        minify: true,
        sourceMaps: true,
        mangle: true
    }

    grunt.registerTask('build', 'jspm build', function() {
        var done = this.async();

        jspm.configureLoader('./lll/jspm.conf.js');
        console.log('app build start...');
        jspm.bundle(jspmCfg.appModule+' - '+vendorsNg.concat(vendorsRest).join(' - '),  distPath+'/app.js', buildOptions).then(function() {
            console.log('...app build completed');
            console.log('angular vendors build start...');
            return jspm.bundle(vendorsNg.join(' + '), distPath+'/angular-vendor.js', buildOptions);
        }).then(function() {
            console.log('..angular vendor build completed');
            console.log('rest vendor build start...');
            return jspm.bundle(vendorsRest.join(' + '), distPath+'/vendor.js', buildOptions);
        }).then(function() {
            console.log('rest vendor build completed');
            done();
        }).catch(function(err) {
            console.error(err);
            done(false);
        });

    });
};