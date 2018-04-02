/**
* @ngdoc overview
* @name lllActivity.overview:lllActivity
*
* @requires lllActivity.overview:lllActivityBase
* @requires lllActivity.lllActivityChoice
* @requires lllActivity.lllActivitySingleChoice
* @requires lllActivity.lllActivityMultipleChoice
* @requires lllActivity.lllActivityCue
* @requires lllActivity.lllActivityGuiSimulation
* @requires lllActivity.lllActivityVideo
* @requires lllActivity.lllActivityVideoGuide
* @requires lllActivity.lllActivitySummary
* @requires lllActivity.lllActivityCustom
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import './components/lll-activity-base/lll-activity-base-module';
import './components/lll-activity-choice/lll-activity-choice-module';
import './components/lll-activity-single-choice/lll-activity-single-choice-module';
import './components/lll-activity-multiple-choice/lll-activity-multiple-choice-module';
import './components/lll-activity-cue/lll-activity-cue-module';
import './components/lll-activity-gui-simulation/lll-activity-gui-simulation-module';
import './components/lll-activity-video/lll-activity-video-module';
import './components/lll-activity-video-guide/lll-activity-video-guide-module';
import './components/lll-activity-summary/lll-activity-summary-module';
import './components/lll-activity-custom/lll-activity-custom-module';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivityDirective from './lll-activity-directive';
import LllActivityController from './lll-activity-controller';

angular.module('lllActivity', [
		'lllActivityBase',
		'lllActivityChoice',
		'lllActivitySingleChoice',
		'lllActivityMultipleChoice',
		'lllActivityCue',
		'lllActivityGuiSimulation',
		'lllActivityVideo',
		'lllActivityVideoGuide',
		'lllActivitySummary',
        'lllActivityCustom',
	])
    .directive('lllActivity', lllUtils.createNgFactory(LllActivityDirective))
    .controller('lllActivity', LllActivityController);
