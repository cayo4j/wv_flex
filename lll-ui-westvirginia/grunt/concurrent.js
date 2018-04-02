/**
* @ngdoc overview
* @name concurrent.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    dev: {
        tasks: [
            'watch:less',
            'watch:livereload'
        ],
        options: {
            logConcurrentOutput: true
        }
    }
}
