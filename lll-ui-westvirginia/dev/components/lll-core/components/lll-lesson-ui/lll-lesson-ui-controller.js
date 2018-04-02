/**
* @ngdoc controller
* @name lllLessonUi.controller:lllLessonUi
* @param {$state} $state class constructor argument
* @param {$http} $http class constructor argument
* @param {lllModel.service:lllModel} lllModel  class constructor argument
* @param {object} appInit  class constructor argument (UNKNOWN....RESOLVE)
* @description
* 
**/
class LllLessonUiController {
    
    constructor($state, $http, lllModel, appInit) {
        this.$state = $state;
        this.$http = $http;
        this.lllModel = lllModel;

        this.lessonModel = lllModel.evalLessonModel(appInit.lessonConfigs[$state.params.lessonName]);
        this.lessonModel.id = $state.params.lessonName;
        this.lessonsList = Object.keys(appInit.lessonConfigs);
    }
}

LllLessonUiController.$inject = ['$state', '$http', 'lllModel', 'appInit'];

export default LllLessonUiController;
