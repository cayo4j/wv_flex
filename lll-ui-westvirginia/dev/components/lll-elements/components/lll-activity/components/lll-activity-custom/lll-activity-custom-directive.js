/**
* @ngdoc directive
* @name  lllActivity.directive:lllActivityCustom
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-custom.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-custom.html!text';

class LllActivityGuiSimulationDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivityCustom';
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
