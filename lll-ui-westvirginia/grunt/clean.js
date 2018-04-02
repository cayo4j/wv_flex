/**
* @ngdoc overview
* @name clean.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var distPath = grunt.config('distPath');
    var devPath = grunt.config('devPath');

    return {
        dist: {
            files: [{
                dot: true,
                src: [distPath]
            }]
        },
        dev: {
        	files: [{
                dot: true,
                src: [devPath]
            }]
        } 
    }
}