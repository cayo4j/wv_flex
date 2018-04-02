/**
* @ngdoc controller
* @name lllRouting.controller:lllHomeController
* @param {$window} $window class constructor argument
* @description
*
* -Insert Documentation
* 
**/
class LllHomeController {
    constructor($window) {
        this.window = $window;
    }
  
/**
* @ngdoc method
* @name openLessonWindow
* @methodOf lllRouting.controller:lllHomeController
* @description
* 
* --Insert Description--
**/	
    openLessonWindow(address) {
        this.window.open(address, 'Course window');
    }
}

LllHomeController.$inject = ['$window'];
export default LllHomeController;