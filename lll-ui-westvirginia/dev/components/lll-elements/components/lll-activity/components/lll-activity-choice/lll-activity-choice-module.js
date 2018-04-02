/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityChoice
* @requires lllActivity.controller:lllActivityChoice -LllActivityChoiceController
* @requires lllActivity.service:lllActivityChoice -LllActivityChoiceService
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import LllActivityChoiceController from './lll-activity-choice-controller';
import LllActivityChoiceService from './lll-activity-choice-service';

angular.module('lllActivityChoice', [])
    .controller('lllActivityChoice', LllActivityChoiceController)
    .service('lllActivityChoice', LllActivityChoiceService);
