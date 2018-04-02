/**
* @ngdoc overview
* @name htmlmin.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function (grunt) {
    return  {
        dev: {
            options: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true,
                removeOptionalTags: true
            },
            files: [{
                expand: true,
                cwd: 'dist',
                src: [grunt.config('appPath')+'/*.html', grunt.config('appPath')+'/{,**/}*.html', '!'+grunt.config('appPath')+'/index.base.html'],
                dest: 'dist'
            }]
        }
    }

}