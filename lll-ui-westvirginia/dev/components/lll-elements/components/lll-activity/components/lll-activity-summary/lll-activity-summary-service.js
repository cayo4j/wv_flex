/**
* @ngdoc service
* @name lllActivity.service:lllActivitySummary
* @param {lllModel.service:lllModel} lllModel class constructor argument
* @description
* 
**/
import _ from 'lodash';

class LllActivitySummaryService {

/**
* @ngdoc method
* @name evalLessonSummary
* @methodOf lllActivity.service:lllActivitySummary
* @description
* 
* --Insert Description--
**/
	evalLessonSummary(lessonModel) {
		let lessonSummary = {};
		lessonSummary.activities = lessonModel.activities.map((activityModel) => this.evalActivitySummary(activityModel));
		lessonSummary.pointsAvailable = lessonModel.pointsAvailable;
		lessonSummary.pointsScored = lessonModel.pointsScored;

		return lessonSummary;
	}
/**
* @ngdoc method
* @name evalActivitySummary
* @methodOf lllActivity.service:lllActivitySummary
* @description
* 
* --Insert Description--
**/
	evalActivitySummary(activityModel) {
		let activitySummary = {};

		activitySummary.type = activityModel.type;
		activitySummary.name = activityModel.name;
		activitySummary.pointsAvailable = activityModel.pointsAvailable;
		activitySummary.pointsScored = activityModel.pointsScored;

		if (activityModel.cuepoints) {
			activitySummary.isRevealable = true;
			activitySummary.revealedCount = activityModel.cuepoints.reduce((revealedCount, cuepointModel) => {
				return revealedCount + (cuepointModel.isRevealed ? 1 : 0);
			}, 0);
			activitySummary.timeoutReachedCount = activityModel.cuepoints.reduce((timeoutReachedCount, cuepointModel) => {
				return timeoutReachedCount + (cuepointModel.reveal.isTimeoutReached ? 1 : 0);
			}, 0);
		}

		return activitySummary;
	}
}

LllActivitySummaryService.$inject = [];

export default LllActivitySummaryService;
