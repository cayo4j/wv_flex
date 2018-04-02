module.exports = function(config) {
    config.set({
        basePath: '../',

        browsers: ['PhantomJS'],

        logLevel: config.LOG_DEBUG,

        jspm: {
            loadFiles: [
                'node_modules/phantomjs-polyfill/bind-polyfill.js',
                'dev/components/**/*_test.js'
            ],
            serveFiles: [
                'config/*.json',
                'dev/components/**/*.js',
                'dev/components/**/*.json',
                'dev/components/**/*.html'
            ]
        },

        frameworks: [
            'jspm',
            'jasmine'
        ],

        colors: true,

        singleRun: false
    });
};