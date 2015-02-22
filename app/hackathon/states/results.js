Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('results', {
      url: '/results',
      templateUrl: '/hackathon/states/results.template.html',
      controllerAs: 'ResultsCtrl',
      resolve: {
        'results': ['$rootScope', '$q', function($rootScope, $q) {
          return {
            name: 'Leah',
            gender: 'Female',
            chosenIndustry: {
              name: 'Dentistry',
              salary6mo: '~$60,000',
              debtIncurred: '~$15,543',
              employmentRate: '~96%',
              breakEven: '~3.5'
            },
            noDegree: {
              salary: '~$25,000',
              employmentRate: '~78%',
              debtIncurred: '~$0',
              netWorth10yrs: '~$1,000,000'
            },
            alternateIndustry1: {
              name: 'Medicine',
              salary6mo: '~$78,000',
              debtIncurred: '~$17,543',
              employmentRate: '~100%',
              breakEven: '~2.5'
            },
            alternateIndustry2: {
              name: 'Optometry',
              salary6mo: '~$66,000',
              debtIncurred: '~$13,543',
              employmentRate: '~100%',
              breakEven: '~3'
            }
          };
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