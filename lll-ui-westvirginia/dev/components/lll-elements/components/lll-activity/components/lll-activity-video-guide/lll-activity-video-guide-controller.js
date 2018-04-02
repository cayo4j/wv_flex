/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityVideoGuide
* @param {$scope} $scope class constructor argument
* @param {$sce} $sce class constructor argument
* @param {lllActivity.service:lllActivityVideo} lllActivityVideo  class constructor argument
* @extends lllActivity.controller:LllActivityVideoController
* @description
* 
* extends lllActivity.controller:LllActivityVideoController
**/
import LllActivityVideoController from '../lll-activity-video/lll-activity-video-controller';

class lllActivityVideoGuideController extends LllActivityVideoController {
    constructor($scope, $sce, lllActivityVideo) {
        super($scope, $sce, lllActivityVideo);
    }
}

lllActivityVideoGuideController.$inject = ['$scope', '$sce', 'lllActivityVideo'];

export default lllActivityVideoGuideController;