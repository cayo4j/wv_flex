
/**
* @ngdoc overview
* @name release.js
* @description
* 
* Please Enter Documentation for this JS File
**/
module.exports = {
    options: {
        bump: false,
        npm: false,
        add: false,
        commit: false,
        tagName: 'lll-ui_<%= version %>',
        commitMessage: 'Release <%= version %>',
        tagMessage: 'Version <%= version %>'
    }
};