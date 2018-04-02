/**
* @ngdoc overview
* @name lllActivity.overview:lllActivitySingleChoice
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivitySingleChoiceDirective from './lll-activity-single-choice-directive';
import LllActivitySingleChoiceController from './lll-activity-single-choice-controller';

angular.module('lllActivitySingleChoice', [])
    .directive('lllActivitySingleChoice', lllUtils.createNgFactory(LllActivitySingleChoiceDirective))
    .controller('lllActivitySingleChoice', LllActivitySingleChoiceController);
