/**
* @ngdoc directive
* @name lllActivity.directive:lllActivityVideo
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-video.html">
     </file>
	 
   </example>
*
**/
import template from './lll-activity-video.html!text';

class lllActivityVideoDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivityVideo';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonTitle: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}
export default lllActivityVideoDirective;