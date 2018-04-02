
/**
* @ngdoc overview
* @name aliases.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    default: [],
    'lll:build': [
        'clean:dist',
        'lessonsInit',
        'less:dist',
        'imagemin:dist',
        'json_merge:dist',
        'copy:indexFile',
        'copy:scriptsjsFile',
        'copy:jspmConf',
        'copy:static',
        'build',
        'copy:dist'
    ],
    'lll:serve': [
        'lll:build',
        'connect:dist'
    ],
    serve: [
        'lessonsInit',
        'less:dev',
        'imagemin:dev',
        'json_merge:dev',
        'copy:devJspmConf',
        'copy:devStatic',
        'connect:dev',
        'concurrent:dev'
    ],
    lessonsInit: [
        'copy:devLessonsImport',
        'copy:devLessonsLinks',
        'folder_list:lessons',
        'lessons-menu-items',
        'lessons-imports',
        'folder_list:customActivities',
        'custom-activities-imports'
    ],
    'test:unit': [
        'karma:dev'
    ],
    'test:ci': [
        'karma:ci'
    ]
};