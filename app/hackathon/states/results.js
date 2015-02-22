Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('results', {
      url: '/results',
      templateUrl: '/hackathon/states/results.template.html',
      controllerAs: 'ResultsCtrl',
      resolve: {
        'results': ['$rootScope', '$q', function($rootScope, $q) {
          return {
            "name": "sam",
            "gender": "Male",
            "chosenIndustry": {
              "name": "Humanities",
              "salary6mo": 31925,
              "debtIncurred": 15020,
              "employmentRate": 86,
              "breakEven": 39
            },
            "noDegree": {
              "salary": 33567,
              "debtIncurred": 0,
              "employmentRate": 86.9
            },
            "alternateIndustry1": {
              "name": "Journalism",
              "salary6mo": 31167,
              "debtIncurred": 15020,
              "employmentRate": 81.2,
              "breakEven": 31
            },
            "alternateIndustry2": {
              "name": "Other Arts & Science",
              "salary6mo": 40714,
              "debtIncurred": 15020,
              "employmentRate": 87.1,
              "breakEven": 16
            }
          };
          // var deferred = $q.defer();
          // if ($rootScope.results) deferred.resolve($rootScope.results);
          // else deferred.reject('You need to have submitted the form on step 1 first.');
          // return deferred.promise;
        }]
      },
      controller: ['results', function(results) {
        var ctrl = this;
        ctrl.currentYear = new Date().getFullYear();
        ctrl.results = results;

        ctrl.getCalendars = function(years) {
          var yearsList = [];
          for (var i = 0; i < years; i++) {
            yearsList.push(i);
          }
          return yearsList;
        };

        window.ResultsController = ctrl;
      }]
    });

  }
]);