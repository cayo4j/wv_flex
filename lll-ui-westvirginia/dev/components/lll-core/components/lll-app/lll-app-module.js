/**
* @ngdoc overview
* @name lllApp.overview:lllApp
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllAppDirective from './lll-app-directive';
import LllAppController from './lll-app-controller';

angular.module('lllApp', [])
    .directive('lllApp', lllUtils.createNgFactory(LllAppDirective))
    .controller('lllApp', lllUtils.createNgFactory(LllAppController));
