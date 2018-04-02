/**
* @ngdoc overview
* @name lllScorm.overview:lllScorm
* @description
* 
* Please Enter Documentation for this JS File
**/
import LllScormService from './lll-scorm-service';
import LllScormClientService from './lll-scorm-client-service';
import LllScormUtilsService from './lll-scorm-utils-service';

angular.module('lllScorm', [])
	.service('lllScorm', LllScormService)
	.service('lllScormClient', LllScormClientService)
	.service('lllScormUtils', LllScormUtilsService);
