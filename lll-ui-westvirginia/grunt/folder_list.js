/**
* @ngdoc overview
* @name folder_list.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function (grunt) {
    var devPath = grunt.config('devPath');
    var devLessonsPath = devPath + '/lessons/';
        
    return {
       lessons: {
            options: {
                files: true,
                folder: false
            },
            files: [
                {
                    src: ['!shared/**', '**/lesson.json'],
                    dest: '.tmp/lessons-configs.json',
                    cwd: devLessonsPath
                }
            ]
        },
        customActivities: {
            options: {
                files: true,
                folder: false
            },
            files: [
                {
                    src: ['!shared/**', '**/custom-activity-*.*'],
                    dest: '.tmp/custom-lessons-configs.json',
                    cwd: devLessonsPath
                }
            ]
        },

    };
};