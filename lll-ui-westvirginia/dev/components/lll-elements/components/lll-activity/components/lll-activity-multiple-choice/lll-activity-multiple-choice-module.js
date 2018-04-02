/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityMultipleChoice
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivityMultipleChoiceDirective from './lll-activity-multiple-choice-directive';
import LllActivityMultipleChoiceController from './lll-activity-multiple-choice-controller';

angular.module('lllActivityMultipleChoice', [])
    .directive('lllActivityMultipleChoice', lllUtils.createNgFactory(LllActivityMultipleChoiceDirective))
    .controller('lllActivityMultipleChoice', LllActivityMultipleChoiceController);
