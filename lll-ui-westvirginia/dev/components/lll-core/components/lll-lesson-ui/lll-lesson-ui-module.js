/**
* @ngdoc overview
* @name lllLessonsUi.overview:lllLessonUi
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllLessonUiDirective from './lll-lesson-ui-directive';
import LllLessonUiController from './lll-lesson-ui-controller';

angular.module('lllLessonUi', [
		'lllElements'
	])
    .directive('lllLessonUi', lllUtils.createNgFactory(LllLessonUiDirective))
    .controller('lllLessonUi', lllUtils.createNgFactory(LllLessonUiController));
