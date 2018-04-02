System.import('angular')
    .then(function() {
        return System.import('./app.module');
    })
    .then(function() {
        return System.import('./styles');
    })
    .then(function() {
        angular.bootstrap(document.body, ['app']);
    })
    .catch(function(err) {
        console.error(err);
    });
