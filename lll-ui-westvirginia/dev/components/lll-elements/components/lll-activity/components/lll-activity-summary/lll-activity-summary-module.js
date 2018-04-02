/**
* @ngdoc overview
* @name lllActivity.overview:lllActivitySummary
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivitySummaryDirective from './lll-activity-summary-directive';
import LllActivitySummaryController from './lll-activity-summary-controller';
import LllActivitySummaryService from './lll-activity-summary-service';

angular.module('lllActivitySummary', ['lllScorm'])
    .directive('lllActivitySummary', lllUtils.createNgFactory(LllActivitySummaryDirective))
    .controller('lllActivitySummary', LllActivitySummaryController)
    .service('lllActivitySummary', LllActivitySummaryService);
