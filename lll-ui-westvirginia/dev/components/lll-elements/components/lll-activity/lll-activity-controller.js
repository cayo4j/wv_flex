/**
 * @ngdoc controller
 * @name lllActivity.controller:lllActivity
 * @description
 * Class Controller for lllApp
 */
class LllActivityController {
    constructor() {
        this.lessonModel; // via attribute
        this.activityModel; // via attribute
        this.onSubmitActivity; // via attribute

        this.on = {
            submitActivity: (activityModel) => this.handleSubmitActivity(activityModel)
        };
    }

/**
* @ngdoc method
* @name isType
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isType(type) {
        return !!this.activityModel && this.activityModel.type === type;
    }
/**
* @ngdoc method
* @name isSingleChoice
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isSingleChoice() {
        return this.isType('singleChoice');
    }
/**
* @ngdoc method
* @name isMultipleChoice
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isMultipleChoice() {
        return this.isType('multipleChoice');
    }
/**
* @ngdoc method
* @name isGuiSimulation
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isGuiSimulation() {
        return this.isType('guiSimulation');
    }
/**
* @ngdoc method
* @name isVideo
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isVideo() {
        return this.isType('video');
    }
/**
* @ngdoc method
* @name isVideoGuide
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isVideoGuide() {
        return this.isType('videoGuide');
    }
/**
* @ngdoc method
* @name isCustom
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isCustom() {
        return this.isType('custom');
    }
/**
* @ngdoc method
* @name isSummary
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    isSummary() {
        return this.isType('summary');
    }
/**
* @ngdoc method
* @name handleSubmitActivity
* @methodOf lllActivity.controller:lllActivity
* @description
* 
* --Insert Description--
**/
    handleSubmitActivity(activityModel) {
	
        this.onSubmitActivity({activityModel});
    }
}

LllActivityController.$inject = [];

export default LllActivityController;
