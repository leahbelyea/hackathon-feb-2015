Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('results', {
      url: '/results',
      templateUrl: '/hackathon/states/results.template.html',
      controllerAs: 'ResultsCtrl',
      resolve: {
        'results': ['$rootScope', '$q', function($rootScope, $q) {
          var deferred = $q.defer();
          if ($rootScope.results) deferred.resolve($rootScope.results);
          else deferred.reject('You need to have submitted the form on step 1 first.');
          return deferred.promise;
        }]
      },
      controller: ['results', function(results) {
        var ctrl = this;
        ctrl.results = results;
        window.ResultsController = ctrl;
      }]
    });

  }
]);