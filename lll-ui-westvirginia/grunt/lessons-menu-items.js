/**
* @ngdoc overview
* @name lessons-menu-items.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function (grunt) {
    var devPath = grunt.config('devPath');    
    var lessonsConfigsFile = '.tmp/lessons-configs.json';
    var homeFile = devPath + '/components/lll-routing/views/home.html';
    var _ = require('lodash')

    grunt.registerTask('lessons-menu-items', function () {

        if (!grunt.file.exists(lessonsConfigsFile)) {
            grunt.log.error('file ' + lessonsConfigsFile + ' not found');
            return false;   //return false to abort the execution
        }
        var lessonConfigsUnsorted = grunt.file.readJSON(lessonsConfigsFile);    //get file as json object
        var lessonConfigs = lessonConfigsUnsorted.sort(function(a, b) {
            return a.location > b.location;
        });
 
        var lessonsImportsNames = _.map(lessonConfigs, function(lesson) {
            var folderName = lesson.location.split('/')[0];
            var displayName = folderName.replace(/[-|_]/g, ' ');
            return {folder: folderName, display: displayName};
        });        
        
        var lessonLinks = _.reduce(lessonsImportsNames, function(accumulator, element) {
           return accumulator + '            <a ng-click="homeCtrl.openLessonWindow(\'#/lesson/'+ element.folder + '\')" class="list-group-item">'+ element.display + '</a>\r\n';
        }, '');
        
        var homeTemplateContent = grunt.file.read(homeFile);
        homeTemplateContent = homeTemplateContent.replace('<!-- lesson links menu -->', lessonLinks);
        
        grunt.file.write(homeFile, homeTemplateContent);        
        console.log('Completed "lessons-menu-items" task');
    });
}