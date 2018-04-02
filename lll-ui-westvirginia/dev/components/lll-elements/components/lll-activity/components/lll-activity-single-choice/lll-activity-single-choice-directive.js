/**
* @ngdoc directive
* @name  lllActivity.directive:lllActivitySingleChoice
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-single-choice.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-single-choice.html!text';

class LllActivitySingleChoiceDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivitySingleChoice';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonTitle: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}

export default LllActivitySingleChoiceDirective;
