/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityVideoGuide
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import lllActivityVideoGuideController from './lll-activity-video-guide-controller';
import lllActivityVideoGuideDirective from './lll-activity-video-guide-directive';

angular.module('lllActivityVideoGuide', [
        'lllActivityVideoGuide'
    ])
    .directive('lllActivityVideoGuide', lllUtils.createNgFactory(lllActivityVideoGuideDirective))
    .controller('lllActivityVideoGuide', lllActivityVideoGuideController);
