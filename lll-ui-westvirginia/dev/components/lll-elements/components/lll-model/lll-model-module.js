/**
* @ngdoc overview
* @name lllModel.overview:lllModel
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import * as lllModelService from './lll-model-service';

angular.module('lllModel', [])
    .value('lllModel', lllModelService);
