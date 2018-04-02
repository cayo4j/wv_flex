/**
* @ngdoc service
* @name lllActivity.service:lllActivityVideo
* @description
* 
**/
class lllActivityVideoService {
    
/**
* @ngdoc method
* @name findTimelyCuepoint
* @methodOf lllActivity.service:lllActivityVideo
* @description
* 
* --Insert Description--
**/	
	findTimelyCuepoint(activityModel, time) {
    	return activityModel.cuepoints.reduce((timelyCuepointModel, cuepointModel) => {
    		if (cuepointModel.videoControl.time !== null && cuepointModel.videoControl.time <= time) {
    			return cuepointModel;
    		}
    		
    		return timelyCuepointModel;
    	}, null);
    }
}

lllActivityVideoService.$inject = [];

export default lllActivityVideoService;