/**
* @ngdoc directive
* @name  lllActivity.directive:lllActivityMultipleChoice
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-multiple-choice.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-multiple-choice.html!text';

class LllActivityMultipleChoiceDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivityMultipleChoice';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonTitle: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}

export default LllActivityMultipleChoiceDirective;
