/**
* @ngdoc service
* @name lllModel.service:lllModel
* @description
* 
* Please Enter Documentation for this JS File
**/
import _ from 'lodash';
/**
* @ngdoc method
* @name evalLessonModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
export function evalLessonModel(lessonData) {
	let lessonModel = {
        title: lessonData.title,
		activities: lessonData.activities.map((activityData) => evalActivityModel(activityData)),
		isCompleted: false,
		pointsAvailable: 0,
		pointsScored: 0,
		pointsRatio: 0,
		isPassed: false,
		passThreshold: {
			pointsRatio: _.get(lessonData, 'pointsRatio')
		}
	};
	return lessonModel;
}
/**
* @ngdoc method
* @name evalActivityModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityModel(activityData) {
	if (activityData.type === 'singleChoice' || activityData.type === 'multipleChoice') {
		return evalActivityChoiceModel(activityData);
	}
    else if (activityData.type === 'guiSimulation') {
		return evalActivityGuiSimulationModel(activityData);
	}
    else if (activityData.type === 'video' || activityData.type === 'videoGuide') {
		return evalActivityVideoModel(activityData);
	}
    else if (activityData.type === 'summary') {
		return evalActivitySummaryModel(activityData);
	}
    if(activityData.type === 'custom') {
        return evalActivityCustomModel(activityData);
    }
}
/**
* @ngdoc method
* @name evalActivityCommonModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityCommonModel(activityData) {
	let activityModel = {
		type: _.get(activityData, 'type', null),
		name: _.get(activityData, 'name', null),
		label: _.get(activityData, 'label', null),
		isSubmitted: false,
        isValid: false,
		pointsAvailable: _.get(activityData, 'pointsAvailable', 0),
		pointsScored: 0,
		pointsRatio: 0
	};

	return activityModel;
}
/**
* @ngdoc method
* @name evalActivityChoiceModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityChoiceModel(activityData) {
	let activityModel = evalActivityCommonModel(activityData);

	activityModel.options = activityData.options.map((optionData) => {
		let optionModel = {
			label: _.get(optionData, 'label', null),
			text: _.get(optionData, 'text', null),
            isCorrect: _.get(optionData, 'isCorrect', false),
			isSelected: false
		};

		return optionModel;
	});

    if(!_.isEmpty(activityData.feedback)) {
        activityModel.feedback = {
            valid: {
                label: _.get(activityData, 'feedback.valid.label', null),
				text: _.get(activityData, 'feedback.valid.text', null)
            },
            invalid: {
                label: _.get(activityData, 'feedback.invalid.label', null),
				text: _.get(activityData, 'feedback.invalid.text', null)
            }
        };
    }

	return activityModel;
}
/**
* @ngdoc method
* @name evalActivityCueModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityCueModel(activityData) {
	let activityModel = evalActivityCommonModel(activityData);

	activityModel.cuepoints = activityData.cuepoints.map((cuepointData) => {
		let cuepointModel = {
			label: _.get(cuepointData, 'label', null),
			reveal: {
                attemptsAvailable: _.get(cuepointData, 'reveal.attemptsAvailable', 0),
				attemptsMade: 0,
				timeout: _.get(cuepointData, 'reveal.timeout', null),
				isTimeoutReached: false
			},
            html: { 
                url: _.get(cuepointData, 'htmlOverlay.url', null),
            },
			isRevealed: false,
			isSubmitted: false
		};

        cuepointModel.overlays = _.get(cuepointData, 'overlays', [])
            .map((overlayData) => ({
				id:_.get(overlayData, 'id', ("ol_"+(Math.ceil(Math.random()*100000)))),
				left: _.get(overlayData, 'left', null),
				top: _.get(overlayData, 'top', null),
				image: {
					url: _.get(overlayData, 'image.url', null),
					width: _.get(overlayData, 'image.width', null),
					height: _.get(overlayData, 'image.height', null)
				},
				label: _.get(overlayData, 'label', null),
                blinkClass: overlayData.blink ? `blink-${overlayData.blink}` : '',
                isSubmit: _.get(overlayData, 'isSubmit', false),
                isCorrect: _.get(overlayData, 'isCorrect', false),
				transform: {left:_.get(overlayData, 'left', null),
							top: _.get(overlayData, 'top', null),
							width: _.get(overlayData, 'image.width', null),
							height: _.get(overlayData, 'image.height', null)
							}
							
            }));

		return cuepointModel;
	});
	return activityModel;
}
/**
* @ngdoc method
* @name evalActivityGuiSimulationModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityGuiSimulationModel(activityData) {
	return evalActivityCueModel(activityData);
}
/**
* @ngdoc method
* @name evalActivityVideoModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityVideoModel(activityData) {
	let activityModel = evalActivityCueModel(activityData);

	activityModel.video = {
		url: _.get(activityData, 'video.url', null),
		width: _.get(activityData, 'video.width', null),
		height: _.get(activityData, 'video.height', null)
	};

	activityModel.cuepoints = activityData.cuepoints.map((cuepointData, cuepointIndex) => {
        return _.extend(activityModel.cuepoints[cuepointIndex], {
			videoControl: {
				time: _.get(cuepointData, 'videoControl.time', null),
				play: _.get(cuepointData, 'videoControl.play', false)
			},
			caption: _.get(cuepointData, 'caption', null)
		});
	});

	return activityModel;
}
/**
* @ngdoc method
* @name evalActivitySummaryModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivitySummaryModel(activityData) {
    return evalActivityCommonModel(activityData);
}
/**
* @ngdoc method
* @name evalActivityCustomModel
* @methodOf lllModel.service:lllModel
* @description
* 
* --Insert Description--
**/	
function evalActivityCustomModel(activityData) {
	let activityModel = evalActivityCommonModel(activityData);
    activityModel.customActivityCode = activityData.code;
    activityModel.customActivityMarkup = activityData.markup;
    
    if(!_.isEmpty(activityData.feedback)) {
        activityModel.feedback = {
            valid: {
                label: _.get(activityData, 'feedback.valid.label', null)
            },
            invalid: {
                label: _.get(activityData, 'feedback.invalid.label', null)
            }
        };
    }
    
	return activityModel;
}