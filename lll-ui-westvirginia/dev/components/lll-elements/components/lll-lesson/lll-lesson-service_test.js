/**
* @ngdoc service
* @name lllLesson.service:lllLessonTest
* @description
* 
* Please Enter Documentation for this JS File
**/
import 'angular-mocks';
import LllLessonService from './lll-lesson-service';

describe('service: "LllLessonService"', () => {

    describe('method: "evalIsCompleted"', () => {
        let service = new LllLessonService();

        it('if all are sumbitted - should return TRUE', () => {
            let model = {
                activities: [
                    { "type": "guiSimulation", "isSubmitted": true },
                    { "type": "guiSimulation", "isSubmitted": true },
                    { "type": "summary", "isSubmitted": true }
            ]};
            service.evalIsCompleted(model);
            expect(model.isCompleted).toBe(true);
        });

        it('if only required are sumbitted - should return TRUE', () => {
            let model = {
                activities: [
                    { "type": "guiSimulation", "isSubmitted": true },
                    { "type": "guiSimulation", "isSubmitted": true },
                    { "type": "summary", "isSubmitted": false }
                ]};
            service.evalIsCompleted(model);
            expect(model.isCompleted).toBe(true);
        });

        it('if some required are sumbitted - should return FALSE', () => {
            let model = {
                activities: [
                    { "type": "guiSimulation", "isSubmitted": true },
                    { "type": "guiSimulation", "isSubmitted": false },
                    { "type": "summary", "isSubmitted": true }
            ]};
            service.evalIsCompleted(model);
            expect(model.isCompleted).toBe(false);
        });
    });

    describe('method: "evalIsPassed"', () => {
        let service = new LllLessonService();

        it('when "pointsRatio" are higher than threshold "pointsScored" - should return TRUE', () => {
            let lessonModel = {
                "pointsRatio": 1,
                "passThreshold": { "pointsRatio": 0.9 }
            };
            service.evalIsPassed(lessonModel)
            expect(lessonModel.isPassed).toBe(true);
        });

        it('when "pointsRatio" are equal to threshold "pointsScored" - should return TRUE', () => {
            let lessonModel = {
                "pointsRatio": 1,
                "passThreshold": { "pointsRatio": 1 }
            };
            service.evalIsPassed(lessonModel)
            expect(lessonModel.isPassed).toBe(true);
        });

        it('when "pointsRatio" are lower than threshold "pointsScored" - should return FALSE', () => {
            let lessonModel = {
                "pointsRatio": 0.7,
                "passThreshold": { "pointsRatio": 1 }
            };
            service.evalIsPassed(lessonModel)
            expect(lessonModel.isPassed).toBe(false);
        });
    })


});