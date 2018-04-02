/**
* @ngdoc service
* @name lllRouting.service:lllRoutingConfig
* @param {$stateProvider} $stateProvider class constructor argument
* @param {$urlRouterProvider} $urlRouterProvider class constructor argument
* @param {$locationProvider} $locationProvider  class constructor argument
* @description
* 
* Please Enter Documentation for this JS File
**/
import angular from 'angular';

import appTemplate from './views/app.html!text';
import homeTemplate from './views/home.html!text';
import lessonTemplate from './views/lesson.html!text';

class LllRoutingConfig {
	constructor($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(false);
		$urlRouterProvider.otherwise('/home');

		$stateProvider
            .state('redirect', {})
			.state('app', {
				template: appTemplate,
				abstract: true
			})
			.state('home', {
				parent: 'app',
				url: '/home',
                controller: 'lllHome as homeCtrl',
				template: homeTemplate
			})
			.state('lesson', {
				parent: 'app',
				url: '/lesson/:lessonName',
				template: lessonTemplate
			});
	}
}

LllRoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default LllRoutingConfig;
