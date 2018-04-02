/**
* @ngdoc overview
* @name lllActivity.overview:lllActivityVideo
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';
import 'angular-sanitize';
import 'videogular';
import 'videogular-controls';
import 'videogular-overlay-play';
import 'videogular-poster';
import 'videogular-buffering';
import 'videogular-dash';

import lllUtils from 'lll-core/components/lll-utils/lll-utils-service';
import lllActivityVideoController from './lll-activity-video-controller';
import lllActivityVideoDirective from './lll-activity-video-directive';
import lllActivityVideoService from './lll-activity-video-service';

angular.module('lllActivityVideo', [
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.buffering"
    ])
    .directive('lllActivityVideo', lllUtils.createNgFactory(lllActivityVideoDirective))
    .controller('lllActivityVideo', lllActivityVideoController)
    .service('lllActivityVideo', lllActivityVideoService);
