/**
* @ngdoc service
* @name lllActivity.service:lllActivityChoice
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';

class LllActivityChoiceService {
/**
* @ngdoc method
* @name validateActivity
* @methodOf lllActivity.service:lllActivityChoice
* @param {activityModel} activityModel lllActivityModule
* @description
* 
* --Insert Description--
**/
    validateActivity(activityModel) {
        activityModel = _.cloneDeep(activityModel);

        activityModel.isValid = activityModel.options.reduce((isValid, optionModel) => {
            return isValid && (optionModel.isCorrect === optionModel.isSelected);
        }, true);

        let pointsAvailable = activityModel.pointsAvailable;
        let pointsScored = activityModel.isValid ? activityModel.pointsAvailable : 0;
        let pointsRatio = pointsAvailable === 0 ? 0 : pointsScored / pointsAvailable;

        activityModel.pointsScored = activityModel.isValid ? pointsAvailable : 0;
        activityModel.pointsRatio = pointsRatio;
        
        return activityModel;
    }
}

LllActivityChoiceService.$inject = [];

export default LllActivityChoiceService;
