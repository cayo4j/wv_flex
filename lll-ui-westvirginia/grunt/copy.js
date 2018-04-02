/**
* @ngdoc overview
* @name copy.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var devPath = grunt.config('devPath');
    var distPath = grunt.config('distPath');

    var jspmCfg = grunt.config('jspm');

    var jspmPackagesDevPath = devPath+'/jspm_packages';
    var jspmPackagesDistPath = distPath+'/jspm_packages';

    var buildFiles = grunt.config('buildFiles');

    return {
        devJspmConf: {
            expand: true,
            src: 'config/jspm.conf.js',
            dest: devPath+'/',
            flatten: true,
            options: {
                process: function(content) {
                    return content.replace(/dev\//g, '')
                                .replace(/\.\.\//g, '/dev');
                }
            }
        },
        devStatic: {
            files: [
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: [
                        '**/angular-busy.css',
                        '**/sweetalert.css',
                        '**/angular-motion.css',
                        '**/bootstrap.min.css',
                        '**/rangy-core.js',
                        '**/rangy-selectionsaverestore.js',
                        '**/fontawesome-webfont.woff*',
                        '**/fontawesome-webfont.ttf',
                        '**/font-awesome.min.css',
                        '**/fonts/videogular.*'
                    ],
                    dest: devPath+'/external',
                    flatten: true
                }
            ]
        },
        indexFile: {
            src: devPath+'/index.html',
            dest: distPath+'/index.html',
            options: {
                process: function(content) {
                    return content.replace(/<!-- build-files -->/g, buildFiles);
                }
            } 
        },
        scriptsjsFile: {
            src: devPath+'/scripts.js',
            dest: distPath+'/scripts.js',
            options: {
                process: function(content) {
                    return content.replace(/app.module/g, jspmCfg.appModule);
                }
            } 
        },
        jspmConf: {
            src: 'config/jspm.conf.js',
            dest: distPath+'/jspm.conf.js',
            options: {
                process: function(content) {
                    return content.replace(/dev\//g, '').replace(/\.\.\//g, '/lll-ui');
                }
            }
        },
        devLessonsImport: {
            src: devPath + '/external/app-init-service-template.js',
            dest: devPath + '/app-init-service.js'
        },
        devLessonsLinks: {
            src: devPath + '/external/home-template.html',
            dest: devPath + '/components/lll-routing/views/home.html'
        },
        distLessonsImport: {
            src: devPath + '/external/app-init-service-template.js',
            dest: distPath + '/app-init-service.js'
        },
        static: {
            files: [
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: [
                        '**/babel*/browser.js'
                    ],
                    dest: jspmPackagesDistPath
                },
                {
                    expand: true,
                    src: devPath+'/fonts/**',
                    dest: distPath+'/fonts',
                    flatten: true
                },
                {
                    expand: true,
                    src: devPath+'/images/**',
                    dest: distPath+'/images',
                    flatten: true
                },
                {
                    expand: true,
                    src: devPath+'/.htaccess',
                    dest: distPath,
                    flatten: true
                },
                {
                    expand: true,
                    src: devPath+'/404.html',
                    dest: distPath,
                    flatten: true
                },
                {
                    expand: true,
                    src: devPath+'/styles.js',
                    dest: distPath,
                    flatten: true
                },
                {
                    expand: true,
                    src: [
                        'config/lll-*.conf*'
                    ],
                    flatten: true,
                    dest: distPath+'/config'
                },
                {
                    expand: true,
                    cwd: devPath,
                    src: 'lessons/**',
                    dest: distPath,
                    flatten: false
                },
                {
                    expand: true,
                    cwd: devPath,
                    src: 'external/scormfunctions.*',
                    dest: distPath
                },  
                {
                    expand: true,
                    cwd: devPath + '/external/scorm',
                    src: '**',
                    dest: distPath
                },                      
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: '**/fonts/videogular.*',
                    dest: distPath+'/external',
                    flatten: true
                }
            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: [
                        '*.js',
                        '*.js*'
                    ],
                    dest: jspmPackagesDistPath
                },
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: [
                        '**/systemjs/**/*json*.js',
                        '**/systemjs/**/*css*.js',
                    ],
                    dest: jspmPackagesDistPath
                },
                {
                    expand: true,
                    cwd: jspmPackagesDevPath,
                    src: [
                        '**/rangy-core.js',
                        '**/rangy-selectionsaverestore.js',
                        '**/bootstrap.min.css',
                        '**/sweetalert.css',
                        '**/angular-busy.css',
                        '**/angular-motion.css',
                        '**/ng-sortable.min.css',
                        '**/rangy-core.js',
                        '**/rangy-selectionsaverestore.js',
                        '**/fontawesome-webfont.woff*',
                        '**/fontawesome-webfont.ttf',
                        '**/font-awesome.min.css'
                    ],
                    dest: distPath+'/external',
                    flatten: true,
                    filter: 'isFile'
                }
            ]
        }
    }
};