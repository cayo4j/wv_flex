/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityBase
* @param {lllAlerts} lllAlerts class constructor argument
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';

class LllActivityBaseController {
    constructor(lllAlerts) {
        this.lllAlerts = lllAlerts;
        
        this.lessonModel; // via attribute
        this.activityModel; // via attribute
        this.onSubmitActivity; // via attribute
    }
/**
* @ngdoc method
* @name activityTitle
* @methodOf lllActivity.controller:lllActivityBase
* @description
* 
* This is the activity title at the top of each lesson.  I removed the hyphen between 'lessonModel.title' and 'activityModel.name'
**/ 
    get activityTitle() {
        return `${this.lessonTitle || _.get(this, 'lessonModel.title')} ${this.activityModel.name}`;  
    } 
/**
* @ngdoc method
* @name submitActivity
* @methodOf lllActivity.controller:lllActivityBase
* @description
*
*
* --1/24/17 SC
* --submitActivity additional functionality:
* --I added the ability for lllAlerts to have not only one sweetalert title, but also a text message underneath.
* --The corresponding swal() method used to be: "swal("feedback title", "success/error")" and now it is "swal("feedback", "text", "success/error")"
**/ 
    submitActivity() {
	
		console.log(" lllActivity.controller:lllActivityBase::submitActivity()");
		
        this.activityModel.isSubmitted = true;

        this.validateActivity();

        var updateModel = () => this.onSubmitActivity({ activityModel: this.activityModel });
        
        if (this.activityModel.feedback && !_.isUndefined(this.activityModel.isValid)) {
            let alertType = this.activityModel.isValid ? 'success' : 'info';//was 'success':'error'
            this.lllAlerts.alert(this.feedback.label, this.feedback.text, alertType)
                .then(() => updateModel());
        } else {
            updateModel();
        }
    }
/**
* @ngdoc method
* @name validateActivity
* @methodOf lllActivity.controller:lllActivityBase
* @description
* 
* --Insert Description--
**/ 
    validateActivity() {
        this.isValid = this.activityModel.isValid = true;
    }
}

LllActivityBaseController.$inject = ['lllAlerts'];

export default LllActivityBaseController;
