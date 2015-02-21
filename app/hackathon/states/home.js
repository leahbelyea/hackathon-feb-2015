Hackathon.config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/hackathon/states/home.template.html',
      controllerAs: 'HomeCtrl',
      resolve: {
        "thing": function() {
          return true;
        }
      },
      controller: ['$http', function($http) {
        var ctrl = this;
        ctrl.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
        ctrl.industries = ['Business', 'Arts', 'Science', 'Law'];
        ctrl.loading = false;
        ctrl.selections = {
          province: '',
          industry: '',
          name: '',
          gender: ''
        };

        ctrl.submit = function() {
          $http.post('/api/submit')
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