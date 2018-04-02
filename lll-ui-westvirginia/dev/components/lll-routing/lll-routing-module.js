/**
* @ngdoc overview
* @name lllRouting.overview:lllRouting
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';
import LllRoutingConfig from './lll-routing-config';
import LllRoutingService from './lll-routing-service';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import lllHome from './lll-home-controller';
import 'lll-core/lll-core-module';

angular.module('lllRouting', [
		'lllCore'
	])
	.config(lllUtils.createNgFactory(LllRoutingConfig))
    .controller('lllHome', lllHome)
	.service('lllRouting', LllRoutingService);
