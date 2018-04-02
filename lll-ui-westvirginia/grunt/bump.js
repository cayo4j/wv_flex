/**
* @ngdoc overview
* @name bump.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    options: {
        bumpVersion: true,
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Version bumped %VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagSubprojects: false,
        push: false,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
    }
};