
/**
* @ngdoc overview
* @name svgmin.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    return {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: grunt.config('appPath')+'/images',
                    src: '{,**/}*.svg',
                    dest: grunt.config('appPath')+'/images'
                }
            ]
        }
    }
}