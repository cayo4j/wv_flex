/**
* @ngdoc directive
* @name lllApp.directive:lllApp
* @restrict 'E'
* @description
* Please Enter Documentation for this JS File
* @example
   <example module="lllApp">
     <file name="lll-app.html">
     </file>
   </example>
*
**/
import template from './lll-app.html!text';

class LllAppDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllApp';
        this.controllerAs = 'ctrl';
        this.scope = {
        };
        this.bindToController = true;
    }
}

export default LllAppDirective;
