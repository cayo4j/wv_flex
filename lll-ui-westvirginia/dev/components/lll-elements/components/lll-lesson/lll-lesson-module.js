/**
* @ngdoc overview
* @name lllLesson.overview:lllLesson
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllLessonDirective from './lll-lesson-directive';
import LllLessonController from './lll-lesson-controller';
import LllLessonService from './lll-lesson-service';

angular.module('lllLesson', [
		'lllScorm'
	])
    .directive('lllLesson', lllUtils.createNgFactory(LllLessonDirective))
    .controller('lllLesson', LllLessonController)
    .service('lllLesson', LllLessonService);
