/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityGuiSimulation
* @param {$scope} $scope class constructor argument
* @extends lllActivity.controller:LllActivityCueController
* @description
* 
* extends lllActivity.controller:lllActivityCueController
**/
import _ from 'lodash';

import LllActivityCueController from '../lll-activity-cue/lll-activity-cue-controller';

class LllActivityGuiSimulationController extends LllActivityCueController {
    constructor($scope) {
    	super($scope);
		this.$scope = $scope;
    }
}

LllActivityGuiSimulationController.$inject = ['$scope'];

export default LllActivityGuiSimulationController;
