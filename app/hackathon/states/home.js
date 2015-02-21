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
      controller: [function() {
        var ctrl = this;

        ctrl.selections = {
          province: '',
          industry: '',
          name: '',
          gender: ''
        };

        ctrl.industries = ['Business', 'Arts', 'Science', 'Law'];

        ctrl.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

        window.HomeController = ctrl;
      }]
    });

  }
]);