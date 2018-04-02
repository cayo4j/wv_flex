/**
* @ngdoc service
* @name lllScorm.service:lllScormClient
* @param {lllScormUtils} lllScormUtils class constructor argument
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';

const COMPLETION_STATUS = 'cmi.completion_status';
const LOCATION = 'cmi.location';
const LEARNER_ID = 'cmi.learner_id';
const LEARNER_NAME = 'cmi.learner_name';
const SUCCESS_STATUS = 'cmi.success_status';
const SCORE_RAW = 'cmi.score.raw';
const SCORE_MIN = 'cmi.score.min';
const SCORE_MAX = 'cmi.score.max';
const SCORE_SCALED = 'cmi.score.scaled';
const PROGRESS_MEASURE = 'cmi.progress_measure';
const SESSION_TIME = 'cmi.session_time';
const EXIT = 'cmi.exit';
const PASSING_SCORE_SCALED = 'cmi.scaled_passing_score';

const COMPLETION_STATUS_UNKNOWN = 'unknown';
const COMPLETION_STATUS_INCOMPLETE = 'incomplete';
const COMPLETION_STATUS_COMPLETED = 'completed';
const SUCCESS_STATUS_PASSED = 'passed';
const SUCCESS_STATUS_FAILED = 'failed';
const EXIT_FINISH = 'normal';
const EXIT_SUSPEND = 'suspend';

const SCO_NAVIGATE = 'adl.nav.request';

class LllScormClientService {
	constructor(lllScormUtils, $log) {
		
		this.lllScormUtils = lllScormUtils;
		this.COMPLETION_STATUS_UNKNOWN = COMPLETION_STATUS_UNKNOWN;
		this.COMPLETION_STATUS_INCOMPLETE = COMPLETION_STATUS_INCOMPLETE;
		this.COMPLETION_STATUS_COMPLETED = COMPLETION_STATUS_COMPLETED;
		this.SUCCESS_STATUS_PASSED = SUCCESS_STATUS_PASSED;
		this.SUCCESS_STATUS_FAILED = SUCCESS_STATUS_FAILED;
		this.EXIT_FINISH = EXIT_FINISH;
		this.EXIT_SUSPEND = EXIT_SUSPEND;
	}
/**
* @ngdoc method
* @name initialize
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	initialize() {
		try {
			console.log("lllScorm.service:lllScormClient::Scorm Initializing");
			return ScormProcessInitialize();
		}
		catch(err) {
			console.error('ScormProcess environment error: ScormProcessInitialize not found.');
		}
	}
/**
* @ngdoc method
* @name terminate
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	terminate() {
		try {
			console.log("lllScorm.service:lllScormClient::Scorm Terminating");
			return ScormProcessTerminate();
		}
		catch(err) {
			console.error('ScormProcess environment error: ScormProcessTerminate not found.');
		}
	}
/**
* @ngdoc method
* @name commit
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	commit() {
		try {
			console.log("lllScorm.service:lllScormClient::Scorm Commiting");
			return ScormProcessCommit();
		}
		catch(err) {
			console.error('ScormProcess environment error: ScormProcessCommit not found.');
		}
	}
/**
* @ngdoc method
* @name getValue
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getValue(key, checkError) {
		try {
		console.log("lllScorm.service:lllScormClient::Scorm Get: " + key);
			return ScormProcessGetValue(key, checkError);
		}
		catch(err) {
			console.error('ScormProcess environment error: ScormProcessGetValue not found.');
		}
	}
/**
* @ngdoc method
* @name setValue
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setValue(key, value) {
		try {
		console.log("lllScorm.service:lllScormClient::Scorm Set: " + key + ":" + value);
			return ScormProcessSetValue(key, value);
		}
		catch(err) {
			console.error('ScormProcess environment error: ScormProcessSetValue not found.');
		}
	}
/**
* @ngdoc method
* @name getPassingScoreScaled
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
    getPassingScoreScaled() {
        return this.getValue(PASSING_SCORE_SCALED, true);
    }
/**
* @ngdoc method
* @name getCompletionStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getCompletionStatus() {
		
		return this.getValue(COMPLETION_STATUS, true);
	}
/**
* @ngdoc method
* @name setCompletionStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setCompletionStatus(completionStatus) {
		console.log("lllScorm.service:lllScormClient::Scorm COMPLETION_STATUS request");
		return this.setValue(COMPLETION_STATUS, completionStatus);
	}
/**
* @ngdoc method
* @name getLearnerId
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getLearnerId() {
		return this.getValue(LEARNER_ID, false);
	}
/**
* @ngdoc method
* @name getLearnerName
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getLearnerName() {
		return this.getValue(LEARNER_NAME, false);
	}
/**
* @ngdoc method
* @name getLocation
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getLocation() {
	console.log("Scorm LOCATION request");
		return this.getValue(LOCATION, false);
	}
/**
* @ngdoc method
* @name setLocation
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setLocation(location) {
		console.log("lllScorm.service:lllScormClient::Scorm setting location");
        return this.setValue(LOCATION, location);
	}
/**
* @ngdoc method
* @name getSuccessStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getSuccessStatus() {
	console.log("lllScorm.service:lllScormClient::Scorm Success Status Request");
		return this.getValue(SUCCESS_STATUS, true);
	}
  /**
* @ngdoc method
* @name setSuccessStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/  
	setSuccessStatus(successStatus) {
		return this.setValue(SUCCESS_STATUS, successStatus);
	}
/**
* @ngdoc method
* @name setScoreRaw
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setScoreRaw(scoreRaw) {
		console.log("lllScorm.service:lllScormClient::Scorm Setting Raw Score");
		return this.setValue(SCORE_RAW, scoreRaw);
	}
/**
* @ngdoc method
* @name setScoreMin
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setScoreMin(scoreMin) {
		console.log("lllScorm.service:lllScormClient::Scorm Setting Min Score");
		return this.setValue(SCORE_MIN, scoreMin);
	}
/**
* @ngdoc method
* @name setScoreMax
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setScoreMax(scoreMax) {
	console.log("lllScorm.service:lllScormClient::Scorm Set Max Score");
		return this.setValue(SCORE_MAX, scoreMax);
	}
/**
* @ngdoc method
* @name setScoreScaled
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setScoreScaled(scoreScaled) {
		console.log("lllScorm.service:lllScormClient::Scorm Set Scaled score");
		return this.setValue(SCORE_SCALED, scoreScaled);
	}
/**
* @ngdoc method
* @name setProgressMeasure
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setProgressMeasure(progressMeasure) {
		console.log("lllScorm.service:lllScormClient::Scorm Set Progress Measure");
		return this.setValue(PROGRESS_MEASURE, progressMeasure);
	}
/**
* @ngdoc method
* @name setSessionTime
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setSessionTime(time) {
	console.log("lllScorm.service:lllScormClient::Scorm Set Session Time");
        return this.setValue(SESSION_TIME, this.lllScormUtils.encodeTime(time));
	}
/**
* @ngdoc method
* @name setExit
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setExit(exit) {
	console.log("lllScorm.service:lllScormClient::Scorm Set Exit");
        return this.setValue(EXIT, exit);
	}
/**
* @ngdoc method
* @name goToNextSco
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/	
	goToNextSco() {
	console.log("lllScorm.service:lllScormClient::Scorm Go to Next SCO");
		return this.setValue(SCO_NAVIGATE, 'continue');
	}
/**
* @ngdoc method
* @name getCourseComplete
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getCourseComplete() {
	console.log("lllScorm.service:lllScormClient::Scorm Get Course Completion");
		return this.getAdlData('courseCompleted');
	}
/**
* @ngdoc method
* @name getSessionAttempt
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getSessionAttempt() {
		console.log("lllScorm.service:lllScormClient::Scorm Get Session Attempts");
		return this.getAdlData('sessionAttempts');
	}
/**
* @ngdoc method
* @name getLastVisitedSCO
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
    getLastVisitedSCO() {
		console.log("lllScorm.service:lllScormClient::Scorm Get Last Visited Sco");
		return this.getAdlData('lastVisitedSCO');
	}
/**
* @ngdoc method
* @name getAdlData
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getAdlData(dataType) {
		let dataBucketsCount = parseInt(this.getValue('adl.data._count'));

        for (var i = 0; i < dataBucketsCount; i++) {
            if (this.getValue(`adl.data.${i}.id`) == `lll.sequencing.forcedsequential.${dataType}`) {
				return this.getValue(`adl.data.${i}.store`);
            }
        }
        return '';
	}
/**
* @ngdoc method
* @name setLastVisitedSCO
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
    setLastVisitedSCO(name) {
	console.log("lllScorm.service:lllScormClient::Scorm  Set Bucket lastVisitedSCO");
		this.setAdlData('lastVisitedSCO', name);
    }
/**
* @ngdoc method
* @name setCompletionStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setCourseComplete(name) {
	console.log("lllScorm.service:lllScormClient::Scorm Set Bucket courseCompleted");
		this.setAdlData('courseCompleted', name);
	}
/**
* @ngdoc method
* @name setSessionAttempt
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setSessionAttempt(name) {
	console.log("lllScorm.service:lllScormClient::Scorm Setting Sessions Attempt");
		this.setAdlData('sessionAttempts', name);
	}
/**
* @ngdoc method
* @name SaveNotesText
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
    SaveNotesText(text) {
		this.setAdlData('notesStorage', text);
    }

/**
* @ngdoc method
* @name setAdlData
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/	setAdlData(dataType, data) {
	console.log("lllScorm.service:lllScormClient::Scorm Bucket: " + dataType + ":" + data);
		let dataBucketsCount = parseInt(this.getValue('adl.data._count'));

        for (var i = 0; i < dataBucketsCount; i++) {
            if (this.getValue(`adl.data.${i}.id`) == `lll.sequencing.forcedsequential.${dataType}`) {
				this.getValue(`adl.data.${i}.store`, data);
            }
        }
	}
/**
* @ngdoc method
* @name getHighestAttemptedSco
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getHighestAttemptedSco(scoList) {
		for (var i = scoList.length - 1; i > 0 ; i--) {
			if (JSON.parse(this.getValue((`adl.nav.request_valid.choice.{target=${scoList[i]}}`), true))) {
				return scoList[i];
			}
		}
	}
/**
* @ngdoc method
* @name navigateToLesson
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	navigateToLesson(scoName) {
		return this.setValue(SCO_NAVIGATE, `{target=${scoName}}choice`);
	}
/**
* @ngdoc method
* @name setObjectivesStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	setObjectivesStatus() {
	console.log("lllScorm.service:lllScormClient::Scorm Completing Objectives");
		let objectivesCount = this.getValue('cmi.objectives._count', true);
		for (var i = 0; i < objectivesCount; i++) {
			this.setValue(`cmi.objectives.${i}.success_status`, 'passed');
			this.setValue(`cmi.objectives.${i}.completion_status`, 'completed');
			this.setValue(`cmi.objectives.${i}.progress_measure`, '1');
		}
	}
/**
* @ngdoc method
* @name getObjectivesCompletionStatus
* @methodOf lllScorm.service:lllScormClient
* @description
* 
* --Insert Description--
**/
	getObjectivesCompletionStatus() {
		let objCount = this.getValue('cmi.objectives._count', true);
		for (var i=0; i < objCount; i++){
			let obj_status = this.getValue(`cmi.objectives.${i}.completion_status`, true);		
			if( obj_status != 'completed') return false;
		}                  
		return true;
	}
}

LllScormClientService.$inject = ['lllScormUtils'];

export default LllScormClientService;