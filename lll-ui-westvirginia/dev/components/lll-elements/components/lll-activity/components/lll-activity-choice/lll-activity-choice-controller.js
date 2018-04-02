/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityChoice
* @param {lllAlerts} lllAlerts class constructor argument
* @param {lllActivityChoice}  lllActivityChoice class constructor argument
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';

import LllActivityBaseController from '../lll-activity-base/lll-activity-base-controller';

class LllActivityChoiceController extends LllActivityBaseController {
    constructor(lllAlerts, lllActivityChoice) {
        super();

        this.lllAlerts = lllAlerts;
        this.lllActivityChoice = lllActivityChoice;

        this.isValid = false;
        this.feedback = null;

        this.validateActivity();
	

		
    }
/**
* @ngdoc method
* @name submitForm
* @methodOf lllActivity.controller:lllActivityChoice
* @description
* 
* --Insert Description--
**/ 
    submitForm(form) {
        if (form.$invalid) {
			return;
        }

        this.submitActivity();
    }
/**
* @ngdoc method
* @name validateActivity
* @methodOf lllActivity.controller:lllActivityChoice
* @description
* 
* --Insert Description--
**/ 
    validateActivity() {
        let activityModel = this.lllActivityChoice.validateActivity(this.activityModel);

        this.isValid = activityModel.isValid;
        if(this.activityModel.feedback) {
            this.feedback = this.isValid ? activityModel.feedback.valid : activityModel.feedback.invalid;     
        }

        this.activityModel = activityModel;
    }
}

LllActivityChoiceController.$inject = ['lllAlerts', 'lllActivityChoice'];

export default LllActivityChoiceController;
