Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('results', {
      url: '/results',
      templateUrl: '/hackathon/states/results.template.html',
      controllerAs: 'ResultsCtrl',
      resolve: {
        'results': ['$rootScope', '$q', function($rootScope, $q) {
          return {
            "name": "Leah",
            "gender": "Female",
            "chosenIndustry": {
              "name": "Law",
              "salary6mo": 57231,
              "debtIncurred": 15020,
              "employmentRate": 92.20671641791044,
              "breakEven": 7
            },
            "noDegree": {
              "salary": 26000,
              "debtIncurred": 0,
              "employmentRate": 82.8
            },
            "alternateIndustry1": {
              "name": "Business & Commerce",
              "salary6mo": 45801,
              "debtIncurred": 15020,
              "employmentRate": 88.13731343283581,
              "breakEven": 9
            },
            "alternateIndustry2": {
              "name": "Journalism",
              "salary6mo": 31167,
              "debtIncurred": 15020,
              "employmentRate": 80.59402985074627,
              "breakEven": 14
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