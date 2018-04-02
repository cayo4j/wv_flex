/**
* @ngdoc overview
* @name less.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    return {
        dev: {
            options: {
                compile: true,
                sourceMap: true
            },
            files: [
                {
                    expand: true,
                    cwd: 'dev/less',
                    src: ['**.less'],
                    dest: grunt.config('devPath')+'/styles/',
                    ext: '.css'
                }
            ]
        },
        dist: {
            options: {
                compile: true,
                sourceMap: false
            },
            files: [{
                expand: true,
                cwd: 'dev/less',
                src: ['**.less'],
                dest: grunt.config('distPath')+'/styles/',
                ext: '.css'
            }]
        }
    }
}