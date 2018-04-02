/**
* @ngdoc overview
* @name karma.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    options: {
        configFile: 'config/karma.conf.js'
    },
    ci: {
        reporters: ['specjson', 'dots'],

        specjsonReporter: {
            outputFile: 'test/tests-results.json'
        },

        singleRun: true
    },
    dev: {
        reporters: ['spec']
    }
};