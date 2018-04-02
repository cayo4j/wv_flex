/**
* @ngdoc overview
* @name lessons-imports.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function (grunt) {
    var devPath = grunt.config('devPath');    
    var lessonsConfigsFile = '.tmp/lessons-configs.json';
    var serviceFile = devPath + '/app-init-service.js';
    var _ = require('lodash')

    grunt.registerTask('lessons-imports', function () {

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
            var moduleName = 'n' + hyphenToCamelCase(folderName);
            return {folder: folderName, module: moduleName};
        });        
        
        var lessonImports = _.reduce(lessonsImportsNames, function(accumulator, element) {
           return accumulator + 'import ' + element.module +  ' from \'./lessons/' + element.folder + '/lesson.json!\';\r\n'
        }, '');

        var lessonMappings = _.reduce(lessonsImportsNames, function(accumulator, element) {
           return accumulator + '            \'' + element.folder + '\': ' + element.module + ',\r\n'
        }, '');
        
        var serviceTemplateContent = grunt.file.read(serviceFile);
        serviceTemplateContent = serviceTemplateContent.replace('/**lessons-imports**/', lessonImports);
        serviceTemplateContent = serviceTemplateContent.replace('/**lessons-mappings**/', lessonMappings);
        
        grunt.file.write(serviceFile, serviceTemplateContent);
        grunt.file.delete(lessonsConfigsFile);
        
        console.log('Completed "lessons-imports" task');
    });
    
    function hyphenToCamelCase(input) { 
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
}