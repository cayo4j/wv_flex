/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityCue
* @param {$scope} $scope class constructor argument
* @extends lllActivity.controller:lllActivityBase
* @description
* 
* extends lllActivity.controller:lllActivityBase
**/


import LllActivityBaseController from '../lll-activity-base/lll-activity-base-controller';
import LllActivitySummaryController from '../lll-activity-summary/lll-activity-summary-controller';

class LllActivityCueController extends LllActivityBaseController {
    constructor($scope, $window) {
    	super();

        this.$scope = $scope;

        this.current = {};
		
		this.$window = $window;
		

		console.log($scope);
		console.log($window);
	
        this.revealTimeout = null;

        this.setCurrentCuepoint(0);

        this.$scope.$on('destroy', () => this.destroy());
	
    }
/**
* @ngdoc method
* @name destroy
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    destroy() {
        this.clearCurrentCuepointRevealTimeout();
    }
/**
* @ngdoc method
* @name setCurrentCuepoint
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    setCurrentCuepoint(cuepointIndex) {

        let cuepointModel = this.activityModel.cuepoints[cuepointIndex];

        this.current.cuepointModel = cuepointModel;
        this.current.cuepointIndex = cuepointIndex;
		console.log("lllActivity.controller:lllActivityCue:setCurrentCuepoint()");
		console.log(cuepointModel);
        this.clearCurrentCuepointRevealTimeout();
        if (cuepointModel.reveal.timeout !== null) {
            this.setCurrentCuepointRevealTimeout();

        }
    }
/**
* @ngdoc method
* @name submitCurrentCuepoint
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    submitCurrentCuepoint() {
		this.$scope.currentCuepoint = this.current.cuepointModel;
        let nextCuepointIndex = this.current.cuepointIndex + 1;

        if (nextCuepointIndex < this.activityModel.cuepoints.length) {
			console.log("less than cuepoint total");
			//swal("Correct!");//sc
            this.setCurrentCuepoint(nextCuepointIndex);
        }
        else {
			console.log("cuepoint not less than cuepoint total...== total");
			//swal("Great job!");//sc
            this.submitActivity();
 
        }
    }
/**
* @ngdoc method
* @name clickCurrentCuepointOverlay
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    clickCurrentCuepointOverlay($event, cuepointOverlayIndex) {
        if ($event.defaultPrevented) {
            return;
        }
        $event.preventDefault();

        let cuepointOverlayModel = this.current.cuepointModel.overlays[cuepointOverlayIndex];

        if(cuepointOverlayModel.isSubmit){
            this.submitCurrentCuepointOverlay(cuepointOverlayIndex);
			
        }
    }
/**
* @ngdoc method
* @name submitCurrentCuepointOverlay
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    submitCurrentCuepointOverlay(cuepointOverlayIndex) {
        let cuepointOverlayModel = this.current.cuepointModel.overlays[cuepointOverlayIndex];

        this.addCurrentCuepointAttempt();

        if (cuepointOverlayModel && cuepointOverlayModel.isCorrect) {
            this.submitCurrentCuepoint();
        }else{
			console.log("SORRY WRONG! submitCurrentCuepointOverlay>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			swal("That is incorrect. Try Again.");//sc
		}
    }
/**
* @ngdoc method 
* @name addCurrentCuepointAttempt
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    addCurrentCuepointAttempt() {
        this.current.cuepointModel.reveal.attemptsMade += 1;
        this.checkCurrentCuepointAttempts();
    }
/**
* @ngdoc method 
* @name checkCurrentCuepointAttempts
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    checkCurrentCuepointAttempts() {
        let attemptsAvailable = this.current.cuepointModel.reveal.attemptsAvailable;
        let attemptsMade = this.current.cuepointModel.reveal.attemptsMade;

        if (attemptsAvailable && attemptsMade >= attemptsAvailable) {
            this.revealCurrentCuepoint();
			console.log("SORRY WRONG! checkCurrentCuepointAttempts>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			//swal("Correct!");//sc
        }
    }
/**
* @ngdoc method 
* @name revealCurrentCuepoint
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    revealCurrentCuepoint() {
        this.current.cuepointModel.isRevealed = true;
		console.log("revealCurrentCuepoint");
		
    }
/**
* @ngdoc method 
* @name setCurrentCuepointRevealTimeout
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    setCurrentCuepointRevealTimeout() {
        let cuepointModel = this.current.cuepointModel;
		
        this.revealTimeout = window.setTimeout(() => this.$scope.$apply(() => {
            cuepointModel.reveal.isTimeoutReached = true;
            this.revealCurrentCuepoint();
        }), cuepointModel.reveal.timeout * 1000);
    }
/**
* @ngdoc method 
* @name clearCurrentCuepointRevealTimeout
* @methodOf lllActivity.controller:lllActivityCue
* @description
* 
* --Insert Description--
**/
    clearCurrentCuepointRevealTimeout() {
        if (this.revealTimeout) {
            window.clearTimeout(this.revealTimeout);
        }
    }

}
LllActivityCueController.$inject = ['$scope', '$window'];

export default LllActivityCueController;
