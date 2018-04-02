/**
* @ngdoc directive
* @name  lllActivity.directive:lllActivitySummary
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-summary.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-summary.html!text';

class LllActivitySummaryDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivitySummary';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonModel: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
		

		
		
    }
}

export default LllActivitySummaryDirective;
