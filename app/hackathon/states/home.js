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
      controller: ['thing', '$q', '$http', '$timeout', function(thing, $q, $http, $timeout) {
        var ctrl = this;
        ctrl.thing = thing;
        
        ctrl.loadProvinceList = function() {
          console.log('Test');
          ctrl.provinces = [];
          var deferred = $q.defer();
          $http.get('/api/provinceList')
          .success(function(data, status) {
            console.log('Thing');
            ctrl.provinces = data;
            deferred.resolve();
          });
          return deferred;
        };

        ctrl.loadUsers = function() {
          console.log('Testtt');
          ctrl.users = [];
          return $timeout(function() {
            ctrl.users = [
              { id: 1, name: 'Scooby Doo' },
              { id: 2, name: 'Shaggy Rodgers' },
              { id: 3, name: 'Fred Jones' },
              { id: 4, name: 'Daphne Blake' },
              { id: 5, name: 'Velma Dinkley' },
            ];
          }, 650);
        };
        
        window.HomeController = ctrl;
      }]
    });

  }
]);