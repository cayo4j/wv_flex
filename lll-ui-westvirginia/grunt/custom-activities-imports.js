/**
* @ngdoc overview
* @name custom-activities-imports.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function (grunt) {
    var _ = require('lodash')

    var devPath = grunt.config('devPath');
    var lessonsConfigsFile = '.tmp/custom-lessons-configs.json'; 
    var serviceFilePath = devPath + '/app-init-service.js';
    
    grunt.registerTask('custom-activities-imports', function (env) {
        if (!grunt.file.exists(lessonsConfigsFile)) {
            grunt.log.error('file ' + lessonsConfigsFile + ' not found');
            return false;   //return false to abort the execution
        }
        var lessonConfigsUnsorted = grunt.file.readJSON(lessonsConfigsFile);    //get file as json object
        var lessonConfigs = lessonConfigsUnsorted.sort(function(a, b) {
            return a.location > b.location;
        });

        var lessonsImportsNames = _.map(lessonConfigs, function(lesson) {
            var filePathSplited = lesson.location.split('/');
            var fileName = filePathSplited[1].split('.')[0];
            var extension = filePathSplited[1].split('.')[1];
  
            var fileNameSplitted = fileName.split('-');
            var activityNumber = fileNameSplitted[fileNameSplitted.length-1] * 1;
            
            var folderName = filePathSplited[0];
            var moduleName = 'n' + hyphenToCamelCase(folderName + '-activity' + activityNumber + '-' + extension);
            return {folder: folderName, module: moduleName, fileName: fileName, fileExt: extension, index: activityNumber-1};
        });        

        var lessonImports = _.reduce(lessonsImportsNames, function(accumulator, element) {
            var postfix = element.fileExt === 'js' ? '' : '.html!text';
            return accumulator + 'import ' + element.module +  ' from \'./lessons/' + element.folder + '/' + element.fileName + postfix + '\';\r\n'
        }, '');
        
        var lessonMappings = _.reduce(lessonsImportsNames, function(accumulator, element) {
            var importType = element.fileExt === 'js' ? 'code' : 'markup';
            return accumulator + '        this.lessonConfigs[\'' + element.folder + '\'].activities[' + element.index + '].' + importType + ' = ' + element.module + ';\r\n'
        }, '');
        
        var serviceTemplateContent = grunt.file.read(serviceFilePath);
        serviceTemplateContent = serviceTemplateContent.replace('/**custom-activities-imports**/', lessonImports);
        serviceTemplateContent = serviceTemplateContent.replace('/**custom-activities-mappings**/', lessonMappings);
        
        grunt.file.write(serviceFilePath, serviceTemplateContent);
        grunt.file.delete(lessonsConfigsFile);
        
        console.log('completed "custom-activities-imports" task');
    });
    
    function hyphenToCamelCase(input) { 
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
    
    var devPath = grunt.config('devPath');
    var distPath = grunt.config('distPath');
    var lessonsConfigsFile = '.tmp/custom-lessons-configs.json'; 
    var serviceFilePathDev = devPath + '/app-init-service.js';
    var serviceFilePathDist = distPath + '/app-init-service.js';
    
    return {
        dev: {
            options: {
                lessonsConfigsFile: '.tmp/custom-lessons-configs.json',
                serviceFilePath: serviceFilePathDev
            }
        },
        dist: {
            options: {
                lessonsConfigsFile: '.tmp/custom-lessons-configs.json',
                serviceFilePath: serviceFilePathDist
            }
        }
    }    
}