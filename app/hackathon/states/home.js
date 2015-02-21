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

        ctrl.provinces = [
          {'name': 'Alberta',                   'abbreviation': 'AB' },
          {'name': 'British Columbia',          'abbreviation': 'BC' },
          {'name': 'Manitoba',                  'abbreviation': 'MB' },
          {'name': 'New Brunswick',             'abbreviation': 'NB' },
          {'name': 'Newfoundland and Labrador', 'abbreviation': 'NL' },
          {'name': 'Nova Scotia',               'abbreviation': 'NS' },
          {'name': 'Ontario',                   'abbreviation': 'ON' },
          {'name': 'Prince Edward Island',      'abbreviation': 'PE' },
          {'name': 'Quebec',                    'abbreviation': 'PQ' },
          {'name': 'Saskatchewan',              'abbreviation': 'SK' }
        ];

        ctrl.selections = {
          province: ''
        };
        
        window.HomeController = ctrl;
      }]
    });

  }
]);