/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityCustom
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivityCustomDirective from './lll-activity-custom-directive';
import LllActivityCustomController from './lll-activity-custom-controller';

angular.module('lllActivityCustom', [])
    .directive('lllActivityCustom', lllUtils.createNgFactory(LllActivityCustomDirective))
    .controller('lllActivityCustom', LllActivityCustomController);
