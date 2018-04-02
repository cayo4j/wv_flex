/**
* @ngdoc directive
* @name lllActivity.directive:lllActivity
* @restrict 'E'
* @description
* 
* Please Enter Documentation for this JS File
**/
import template from './lll-activity.html!text';

class LllActivityDirective {
/**
* @ngdoc method
* @name constructor
* @methodOf lllActivity.directive:lllActivity
* @description
* 
* --Insert Description--
**/
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.controller = 'lllActivity';
        this.controllerAs = 'ctrl';
        this.scope = {
            lessonModel: '=',
            activityModel: '=',
            onSubmitActivity: '&'
        };
        this.bindToController = true;
    }
}

export default LllActivityDirective;
