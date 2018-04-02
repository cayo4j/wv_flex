/**
* @ngdoc overview
* @name jshint.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },
    all: [
        'Gruntfile.js'
    ],
    test: {
        src: ['test/unit/{,*/}*.js']
    }
}
