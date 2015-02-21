Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/hackathon/states/home.template.html',
      controllerAs: 'HomeCtrl',
      resolve: {
        'industries': ['$q', '$http', function($q, $http) {
          var deferred = $q.defer();
          var names = [];

          $http.get('/api/getIndustryList')
          .success(function(data, status) {

            _.each(data, function(item) {
              names.push(item.name);
            });

            deferred.resolve(names);
          });

          return deferred.promise;
        }]
      },
      controller: ['$http', '$state', '$mdDialog', '$timeout', 'industries', function($http, $state, $mdDialog, $timeout, industries) {
        var ctrl = this;

        ctrl.errs = [];
        ctrl.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
        ctrl.industries = industries;
        ctrl.loading = false;
        ctrl.selections = {
          province: '',
          industry: '',
          name: '',
          gender: ''
        };

        ctrl.errorsOnForm = function() {
          $mdDialog.show(
            $mdDialog.alert()
              .content('All fields in the form a required!')
              .ok('Got it!')
          );
        };

        ctrl.submit = function() {
          ctrl.errs = [];

          if (ctrl.selections.province === '') {
            ctrl.errs.push('Province is a required field!');
          }

          if (ctrl.selections.industry === '') {
            ctrl.errs.push('Area of study is a required field!');
          }

          if (ctrl.selections.name === '') {
            ctrl.errs.push('Name is a required field!');
          }

          if (ctrl.selections.gender === '') {
            ctrl.errs.push('Gender choice is required!');
          }

          if (ctrl.errs.length !== 0) {
            return ctrl.errorsOnForm();
          }

          ctrl.loading = true;
          $http.post('/api/submit', ctrl.selections)
          .success(function(data, status) {
            console.log('Success!');

            $timeout(function() {
              ctrl.loadingf = false;
              $state.go('results');
            }, 2000);
          })
          .error(function(data, status) {
            console.log('Fail!');
          });
        };

        window.HomeController = ctrl;
      }]
    });

  }
]);