/**
* @ngdoc service
* @name lllAlerts.service:lllAlerts
* @param {$q} $q class constructor argument
* @description
* 
**/
import sweetalert from 'sweetalert';

class LllAlertsService {
    constructor($q) {
        this.$q = $q;
    }
/**
* @ngdoc method
* @name alert
* @methodOf lllAlerts.service:lllAlerts
* @description
* 
* --Insert Description--
**/	
    alert(message, subtext, alertType) {
        // available alert types: 'success', 'info', 'warning', 'error'
        let deferred = this.$q.defer();
        let alert = { title: message, text: subtext, type: alertType || "warning" };
        sweetalert(alert, () => deferred.resolve() );
        return deferred.promise;
    }
/**
* @ngdoc method
* @name message
* @methodOf lllAlerts.service:lllAlerts
* @description
* 
* --Insert Description--
**/	
    confirm(message) {
        let deferred = this.$q.defer();
        let alert = { 
            title: message, 
            showCancelButton: true, 
            cancelButtonText: "No", 
            confirmButtonText: "Yes" 
        };
        sweetalert(alert, (isConfimed) => {
            deferred.resolve(isConfimed);
        });
        return deferred.promise;
    }
}

LllAlertsService.$inject = ['$q'];

export default LllAlertsService;
