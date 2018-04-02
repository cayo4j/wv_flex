/**
* @ngdoc directive
* @name lllLessonUi.directive:lllLessonUi
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllLessonUi">
     <file name="lll-lesson-ui.html">
     </file>
   </example>
*
**/
import template from './lll-lesson-ui.html!text';

class LllLessonUiDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllLessonUi';
        this.controllerAs = 'ctrl';
        this.scope = {
        };
        this.bindToController = true;
    }
}

export default LllLessonUiDirective;
