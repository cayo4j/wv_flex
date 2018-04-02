/**
* @ngdoc service
* @name lllLesson.service:lllLesson
* @description
* 
**/
import _ from 'lodash';

class LllLessonService {

/**
* @ngdoc method
* @name validateLesson
* @methodOf lllLesson.service:lllLesson
* @description
* 
* --Insert Description--
**/	
    validateLesson(lessonModel) {
        lessonModel = _.cloneDeep(lessonModel);

        this.evalIsCompleted(lessonModel);

        let pointsAvailable = lessonModel.activities.reduce((pointsAvailable, activityModel) => pointsAvailable + activityModel.pointsAvailable, 0);
        let pointsScored = lessonModel.activities.reduce((pointsScored, activityModel) => pointsScored + activityModel.pointsScored, 0);
        let pointsRatio = pointsAvailable === 0 ? 0 : pointsScored / pointsAvailable;

        lessonModel.pointsAvailable = pointsAvailable;
        lessonModel.pointsScored = pointsScored;
        lessonModel.pointsRatio = pointsRatio;
        this.evalIsPassed(lessonModel);

        return lessonModel;
    }
 /**
* @ngdoc method
* @name evalIsCompleted
* @methodOf lllLesson.service:lllLesson
* @description
* 
* --Insert Description--
**/	   
    evalIsCompleted(lessonModel) { 
        lessonModel.isCompleted = lessonModel.activities.reduce((isCompleted, activityModel) => isCompleted && (activityModel.type === 'summary' || activityModel.isSubmitted), true);
    }
 /**
* @ngdoc method
* @name evalIsPassed
* @methodOf lllLesson.service:lllLesson
* @description
* 
* --Insert Description--
**/	   
    evalIsPassed(lessonModel) {
        lessonModel.isPassed = lessonModel.pointsRatio >= lessonModel.passThreshold.pointsRatio;
    }
  /**
* @ngdoc method
* @name isResumingProhibited
* @methodOf lllLesson.service:lllLesson
* @description
* 
* --Insert Description--
**/	  
    isResumingProhibited(lessonModel) {
        // if lesson is scored type (e.g. quiz) and it's status is not "passed", don't allow resuming
        return _.isNumber(lessonModel.passThreshold.pointsRatio) && !lessonModel.isPassed;
    }
}

LllLessonService.$inject = [];

export default LllLessonService;
