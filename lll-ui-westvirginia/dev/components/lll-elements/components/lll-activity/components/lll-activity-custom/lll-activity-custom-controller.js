/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityCustom
* @param {lllActivity.service:lllAlerts} lllAlerts class constructor argument
* @param {$scope} $scope class constructor argument
* @param {$elements} $elements class constructor argument
* @extends lllActivity.controller:lllActivityBaseController
* @description
* 
* extends lllActivity.controller:lllActivityBaseController
**/
import _ from 'lodash';
import $ from 'jquery';

import LllActivityBaseController from '../lll-activity-base/lll-activity-base-controller';

class LllActivityCustomController extends LllActivityBaseController {
    constructor(lllAlerts, $scope, $element) {
        super(lllAlerts);
        
        this.$scope = $scope;

        let contentElement = angular.element($element.find('div')[1]);
        contentElement.append(this.activityModel.customActivityMarkup);
        this.activityModel.customActivityCode((score) => this.completeActivity(score) );
    }
/**
* @ngdoc method
* @name completeActivity
* @methodOf lllActivity.controller:lllActivityCustom
* @description
* 
* --Insert Description--
**/
    completeActivity(score) {
        this.$scope.$evalAsync(() => { 
            this.activityModel.pointsScored = score;
            this.submitActivity();
        });
    }
/**
* @ngdoc method
* @name validateActivity
* @methodOf lllActivity.controller:lllActivityCustom
* @description
* 
* --Insert Description--
**/  
    validateActivity() {
        this.isValid = this.activityModel.isValid;
        if(this.activityModel.feedback) {
            this.feedback = this.isValid ? this.activityModel.feedback.valid : this.activityModel.feedback.valid;   //last parameter was 'invalid'
        }
    }
}

LllActivityCustomController.$inject = ['lllAlerts', '$scope', '$element'];

export default LllActivityCustomController;
