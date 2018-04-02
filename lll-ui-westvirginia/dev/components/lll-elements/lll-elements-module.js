/**
* @ngdoc overview
* @name lllElements.overview:lllElements
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import './components/lll-model/lll-model-module';
import './components/lll-lesson/lll-lesson-module';
import './components/lll-activity/lll-activity-module';
import './components/lll-alerts/lll-alerts-module';

angular.module('lllElements', [
    'lllModel',
    'lllLesson',
    'lllActivity',
    'lllAlerts'
]);
