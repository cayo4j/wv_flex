/**
* @ngdoc overview
* @name connect.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = function(grunt) {
    var lrPort = grunt.config('livereloadPort');
    var devPath = grunt.config('devPath');
    var distPath = grunt.config('distPath');
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    var port = 3000;

    return {
        dev: {
            options: {
                port: port,
                livereload: lrPort,
                open: 'http://localhost:'+port,
                middleware: function(connect) {
                    return [
                        lrSnippet,
                        connect.static(devPath),
                        connect.static('.')
                    ]
                }
            }
        },
        dist: {
            options: {
                port: port,
                open: 'http://localhost:'+port+'/'+distPath,
                keepalive: true,
                middleware: function(connect) {
                    return [
                        connect.static('.')
                    ]
                }
            }
        }
    }
}