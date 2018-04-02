/**
* @ngdoc overview
* @name lllCore.overview:lllCore
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';
import 'angular-animate';
import 'angular-touch';
import 'angular-ui-router';
import 'angular-busy/dist/angular-busy';
import 'lodash';
import 'moment';

import './components/lll-app/lll-app-module';
import './components/lll-lesson-ui/lll-lesson-ui-module';

angular.module('lllCore', [
    'ngAnimate',
    'ngTouch',
    'ui.router',
    'cgBusy',

    'lllApp',
    'lllLessonUi'
]);
