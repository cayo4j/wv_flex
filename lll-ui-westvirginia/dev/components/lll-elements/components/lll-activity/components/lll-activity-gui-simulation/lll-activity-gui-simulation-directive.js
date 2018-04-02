/**
* @ngdoc directive
* @name  lllActivity.directive:lllActivityGuiSimulation
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-gui-simulation.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-gui-simulation.html!text';

class LllActivityGuiSimulationDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivityGuiSimulation';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonTitle: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}

export default LllActivityGuiSimulationDirective;
