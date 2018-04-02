/**
* @ngdoc service
* @name lllScorm.service:lllScorm
* @param {lllScormClient} lllScormClient class constructor argument 
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';

class LllScormService {
	constructor(lllScormClient) {
		this.lllScormClient = lllScormClient;
	}
/**
* @ngdoc method
* @name startSession
* @methodOf lllScorm.service:lllScorm
* @description
* 
* returns result of lll.ScormClient.initialize method
**/
	startSession() {
		console.log("scormclientservice: startsession");
		return this.lllScormClient.initialize();
	}
/**
* @ngdoc method
* @name endSession
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	endSession() {
		console.log("scormclientservice: endsession");
		this.lllScormClient.terminate();
	}
/**
* @ngdoc method
* @name setSessionTime
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/	
	setSessionTime(sessionTime) {
		this.lllScormClient.setSessionTime(sessionTime);
	}

/**
* @ngdoc method
* @name saveSession
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	saveSession() {
		console.log("scormclientservice: savesession");
		this.lllScormClient.commit();
	}
/**
* @ngdoc method
* @name getLearner
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	getLearner() {
		return {
			id: this.lllScormClient.getLearnerId(),
			name: this.lllScormClient.getLearnerName()
		};
	}
/**
* @ngdoc method
* @name startLesson
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	startLesson(lessonModel) {
		console.log("lll-scorm-service: startlesson()");
        lessonModel.isCompleted = this.lllScormClient.getObjectivesCompletionStatus();

        lessonModel.isCompleted ?
			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_COMPLETED) :
			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_INCOMPLETE);

		if (this.isLessonScored(lessonModel)) {
			let successStatus = this.lllScormClient.getSuccessStatus();
			lessonModel.isPassed = successStatus === this.lllScormClient.SUCCESS_STATUS_PASSED;
		}
	}
/**
* @ngdoc method
* @name endSummary
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/	
	endSummary(lessonModel){
	
			this.lllScormClient.setExit(this.lllScormClient.EXIT_FINISH);
			this.lllScormClient.goToNextSco();
			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_COMPLETED);
			this.lllScormClient.setObjectivesStatus();
			this.endSession();
	}
	
/**
* @ngdoc method
* @name endLesson
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	endLesson(lessonModel, hasSummary) {
	console.log("scormclientservice: endlesson");
		if (lessonModel.isCompleted) {			
			if (!hasSummary) {
				console.log("scormclientservice: has no summary ...saving...gotonextsco");
				this.saveLesson(lessonModel);				
				this.lllScormClient.goToNextSco();
			}

			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_COMPLETED);
			this.lllScormClient.setExit(this.lllScormClient.EXIT_FINISH);
		}
		else {
			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_INCOMPLETE);
		}
	}
/**
* @ngdoc method
* @name suspendLesson
* @methodOf lllScorm.service:lllScorm
* @description
* 
* 
**/
	suspendLesson(hasSummary) {		
		console.log("lll-scorm-service: suspendlesson()");	
		if (!hasSummary) {
				console.log("NO SUMMARY DETECTED");
				this.lllScormClient.goToNextSco();
			}

		this.lllScormClient.setExit(this.lllScormClient.EXIT_SUSPEND);
	}
/**
* @ngdoc method
* @name saveLesson
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	saveLesson(lessonModel) {
		console.log("lll-scorm-service:savelesson()");
		if (lessonModel.isCompleted) {
			console.log("lllScorm.service:lllScorm:lllScormService::saveLesson()");
			this.lllScormClient.setCompletionStatus(this.lllScormClient.COMPLETION_STATUS_COMPLETED);
			this.lllScormClient.setObjectivesStatus();

			if (this.isLessonScored(lessonModel)) {
				lessonModel.isPassed ?
					this.lllScormClient.setSuccessStatus(this.lllScormClient.SUCCESS_STATUS_PASSED) :
					this.lllScormClient.setSuccessStatus(this.lllScormClient.SUCCESS_STATUS_FAILED);
				this.lllScormClient.setScoreScaled(lessonModel.pointsScored / lessonModel.pointsAvailable);
				console.log("SCORE: " + lessonModel.pointsScored / lessonModel.pointsAvailable);
			}
			this.lllScormClient.goToNextSco();
		}
	}
	
/**
* @ngdoc method
* @name forceFail
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/	
	forceFail(){
		this.lllScormClient.setSuccessStatus(this.lllScormClient.SUCCESS_STATUS_FAILED);
		this.lllScormClient.setExit(this.lllScormClient.EXIT_FINISH);
		//this.lllScormClient.goToNextSco();
		//this.endSession();
	}
	
	
/**
* @ngdoc method
* @name getHighestAttemptedSco
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/	
	getHighestAttemptedSco(scoList) {
		return this.lllScormClient.getHighestAttemptedSco(scoList);
	}
/**
* @ngdoc method
* @name navigateToLesson
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	navigateToLesson(scoName) {
		console.log("lll-scorm-service: navigateToLesson()");
		return this.lllScormClient.navigateToLesson(scoName);
	}
/**
* @ngdoc method
* @name isLessonScored
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/	
	isLessonScored(lessonModel) {
		return !isNaN(lessonModel.passThreshold.pointsRatio);
	}
/**
* @ngdoc method
* @name getActivityIndex
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	getActivityIndex() {
		return this.lllScormClient.getLocation() * 1 || 0;
	}
/**
* @ngdoc method
* @name setActivityIndex
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	setActivityIndex(activityIndex) {
	console.log("lll-scorm-service: setActivityIndex()");
		return this.lllScormClient.setLocation(activityIndex);
	}
/**
* @ngdoc method
* @name startActivity
* @methodOf lllScorm.service:lllScorm
* @description
* 
* ---insert description---
**/
	startActivity(lessonModel, activityIndex) {
		console.log("lll-scorm-service: startActivity()");
		let endedActivitiesCount = activityIndex + 1;
		let progress = endedActivitiesCount / lessonModel.activities.length

		return this.lllScormClient.setProgressMeasure(progress);
	}

}

LllScormService.$inject = ['lllScormClient'];

export default LllScormService;