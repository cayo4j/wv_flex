/**
* @ngdoc controller
* @name lllActivity.controller:lllActivityMultipleChoice
* @param {lllActivity.controller:lllAlerts} lllAlerts class constructor argument
* @param {lllActivity.controller:lllActivityChoice} lllActivityChoice class constructor argument
* @extends lllActivity.controller:lllActivityChoiceController
* @description
* 
* extends lllActivity.controller:lllActivityChoiceController
**/
import _ from 'lodash';

import LllActivityChoiceController from '../lll-activity-choice/lll-activity-choice-controller';

class LllActivityMultipleChoiceController extends LllActivityChoiceController {
    constructor(lllAlerts, lllActivityChoice) {
        super(lllAlerts, lllActivityChoice);
    }
}

LllActivityMultipleChoiceController.$inject = ['lllAlerts', 'lllActivityChoice'];

export default LllActivityMultipleChoiceController;
