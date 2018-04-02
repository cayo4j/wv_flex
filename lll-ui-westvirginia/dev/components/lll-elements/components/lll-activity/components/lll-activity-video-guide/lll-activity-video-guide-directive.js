/**
* @ngdoc directive
* @name lllActivity.directive:lllActivityVideoGuide
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllActivity">
     <file name="lll-activity-video-guide.html">
     </file>
   </example>
*
**/
import template from './lll-activity-video-guide.html!text';

class lllActivityVideoGuideDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivityVideoGuide';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonTitle: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}
export default lllActivityVideoGuideDirective;