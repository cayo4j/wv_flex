/**
* @ngdoc directive
* @name lllLesson.directive:lllLesson
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllLesson">
     <file name="lll-lesson.html">
     </file>
   </example>
*
**/
import template from './lll-lesson.html!text';

class LllLessonDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllLesson';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonModel: '=',
            lessonsList: '='
        };
        this.bindToController = true;
    }
}

export default LllLessonDirective;
