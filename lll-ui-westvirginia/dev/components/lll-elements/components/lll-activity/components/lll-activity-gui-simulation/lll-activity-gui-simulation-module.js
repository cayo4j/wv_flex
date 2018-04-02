/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityGuiSimulation
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import LllActivityGuiSimulationDirective from './lll-activity-gui-simulation-directive';
import LllActivityGuiSimulationController from './lll-activity-gui-simulation-controller';

angular.module('lllActivityGuiSimulation', [])
    .directive('lllActivityGuiSimulation', lllUtils.createNgFactory(LllActivityGuiSimulationDirective))
    .controller('lllActivityGuiSimulation', LllActivityGuiSimulationController);
