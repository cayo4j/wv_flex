/**
* @ngdoc service
* @name lllRouting.service:lllRouting
* @param {$state} $state class constructor argument
* @description
* 
* Please Enter Documentation for this JS File
**/
const REDIRECT_STATE_NAME = 'redirect';

class LllRoutingService {
	constructor($state) {
		this.$state = $state;
	}

	redirect(redirectTo, params = {}, options = {}) {
		return this.$state.go(REDIRECT_STATE_NAME).then(() => {
			return this.$state.go(redirectTo, params, options);
		});
	}
}

LllRoutingService.$inject = ['$state'];

export default LllRoutingService;