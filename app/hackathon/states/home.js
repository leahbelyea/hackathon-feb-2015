Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/hackathon/states/home.template.html',
      controllerAs: 'HomeCtrl',
      resolve: {
        "industries": ['$q', function($q) {
          var deferred = $q.defer();
          $http.get('/api/getIndustryList')
          .success(function(data, status) {
            var list = _.keys(data);
            deferred.resolve(list);
          });
          return deferred;
        }]
      },
      controller: ['$http', '$mdDialog', 'industries', function($http, $mdDialog, industries) {
        var ctrl = this;

        ctrl.errs = [];
        ctrl.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
        ctrl.industries = ['Business', 'Arts', 'Science', 'Law'];
        ctrl.loading = false;
        ctrl.selections = {
          province: '',
          industry: '',
          name: '',
          gender: ''
        };

        console.log(ctrl.industries);

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

          if (errs.length !== 0) {
            return ctrl.errorsOnForm();
          }

          ctrl.loading = true;
          $http.post('/api/submit', ctrl.selections)
          .success(function(data, status) {
            console.log('Success!');
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