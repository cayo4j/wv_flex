/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityVideo
* @param {$scope} $scope class constructor argument
* @param {$sce} $sce class constructor argument
* @param {lllActivity.service:lllActivityVideo} lllActivityVideo  class constructor argument
* @extends lllActivity.controller:LllActivityCueController
* @description
* 
* extends lllActivity.controller:LllActivityCueController
**/
import LllActivityCueController from '../lll-activity-cue/lll-activity-cue-controller';

const TIME_DELTA_ACCURACY = 0.5;

class lllActivityVideoController extends LllActivityCueController {
    constructor($scope, $sce, lllActivityVideo) {
        super($scope);

        this.$scope = $scope;
        this.$sce = $sce;
        this.lllActivityVideo = lllActivityVideo;

        this.videogular = null;

        this.on = {
            playerReady: (videogular) => this.handlePlayerReady(videogular),
            updateTime: (time) => this.handleUpdateTime(time),
            complete: () => this.handleComplete()
        };
    }
/**
* @ngdoc method
* @name setCurrentCuepoint
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    setCurrentCuepoint(cuepointIndex) {
        super.setCurrentCuepoint(cuepointIndex);
        this.applyCurrentCuepoint();
    }
/**
* @ngdoc method
* @name  applyCurrentCuepoint
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    applyCurrentCuepoint() {
	
		console.log("VIDEO TRYING");
        if (this.videogular) {
		
            let time = this.current.cuepointModel.videoControl.time;
            let play = this.current.cuepointModel.videoControl.play;

            if (time !== null) {
                let currentTime = this.videogular.currentTime / 1000;
                let timeDelta = Math.abs(currentTime - time);

                if (timeDelta > TIME_DELTA_ACCURACY) {
                    this.videoSeekTime(time);
                }

                if (play) {
                    this.videoPlay();
					console.log("video play()");
                }
                else {
                    this.videoPause();
                }
            }else{
			console.log("video time is null");
			}
			
        }
    }
/**
* @ngdoc method
* @name  handlePlayerReady
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    handlePlayerReady(videogular) {
        this.videogular = videogular;

        this.options = {
            sources: [{
                src: this.$sce.trustAsResourceUrl(this.activityModel.video.url),
                type: 'video/mp4'
            }]
        };

        window.setTimeout(() => {
            this.applyCurrentCuepoint();
            this.$scope.$apply();
        }, 0);
    }
/**
* @ngdoc method
* @name handleUpdateTime
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    handleUpdateTime(time) {
        let cuepointModel = this.lllActivityVideo.findTimelyCuepoint(this.activityModel, time);
        let cuepointIndex = this.activityModel.cuepoints.indexOf(cuepointModel);

        if (cuepointIndex !== -1 && cuepointIndex !== this.current.cuepointIndex) {
            this.setCurrentCuepoint(cuepointIndex);
        }
    }
/**
* @ngdoc method
* @name handleComplete
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    handleComplete() {
		console.log("lllActivity.controller:lllActivityVideo::handleComplete()");
        this.submitCurrentCuepoint();
    }
/**
* @ngdoc method
* @name videoPlay
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    videoPlay() {
        if (this.videogular) {
            this.videogular.play();
        }
    }
/**
* @ngdoc method
* @name videoPause
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    videoPause() {
		console.log("lllActivity.controller:lllActivityVideo::videoPause()");
        if (this.videogular) {
            this.videogular.pause();
        }
    }
/**
* @ngdoc method
* @name videoSeekTime
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    videoSeekTime(time) {
		console.log("lllActivity.controller:lllActivityVideo::videoSeekTime(:" + time + ")");
        if (this.videogular) {
            this.videogular.seekTime(time);
        }
    }
/**
* @ngdoc method
* @name resetLesson
* @methodOf lllActivity.controller:lllActivityVideo
* @description
* 
* --Insert Description--
**/
    resetLesson() {
		console.log("lllActivity.controller:lllActivityVideo::resetLesson()");
        this.setCurrentCuepoint(0);
    }
}

lllActivityVideoController.$inject = ['$scope', '$sce', 'lllActivityVideo'];

export default lllActivityVideoController;