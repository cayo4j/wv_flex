/**
* @ngdoc overview
* @name watch.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var devPath = grunt.config('devPath');
    var lrPort = grunt.config('livereloadPort');
    return  {
        options: {
            spawn: true,
            interval: 1007
        },
        jsTest: {
            files: ['test/{,**/}*.js'],
            tasks: ['karma']
        },
        less: {
            files: [
                'styles/{,**/}*.less',
                devPath+'/{,**/}*.less'
            ],
            tasks: ['less:dev']
        },
        livereload: {
            options: {
                livereload: lrPort
            },
            files: [
                devPath+'/{,**/}*.html',
                devPath+'/{,**/}*.js',
                devPath+'/{,**/}*.json',
                devPath+'/{,**/}*.css',
                devPath+'/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        },
        poedit: {
            files: ['po/*.po'],
            tasks: ['gt-compile']
        }
    }
};