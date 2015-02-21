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
      controller: ['thing',  function(thing) {
        var ctrl = this;
        
        ctrl.thing = thing;
        
        ctrl.loadProvinceList = function() {
          return $http.get('/api/provinceList');
        };
        
        window.HomeController = ctrl;
      }]
    });

  }
]);