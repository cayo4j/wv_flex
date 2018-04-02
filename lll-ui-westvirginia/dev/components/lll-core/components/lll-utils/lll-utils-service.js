/**
* @ngdoc service
* @name lllUtils.service:lllUtils
* @description
* 
* Please Enter Documentation for this JS File
**/

/**
* @ngdoc method
* @name createNgFactory
* @methodOf lllUtils.service:lllUtils
* @description
* 
* --Insert Description--
**/	
function createNgFactory(factoryClass) {
    return (factoryClass.$inject || []).concat((...args) => {
        return new factoryClass(...args);
    });
};

export default {
    createNgFactory
};
