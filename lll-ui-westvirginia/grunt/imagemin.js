/**
* @ngdoc overview
* @name imagemin.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt){
    var appPath = grunt.config('appPath');
    var distPath = grunt.config('distPath');
    var devPath = grunt.config('devPath');

    return {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: appPath+'/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: devPath+'/assets/images'
                }
            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    cwd: appPath+'/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: distPath+'/assets/images'
                }
            ]
        }
    }
}