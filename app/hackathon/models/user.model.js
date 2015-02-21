Hackathon.factory('UserModel', function() {

    function User (userData) {
      if (userData) this.build(userData);
    }

    User.prototype = {

      build: function(userData) {
        angular.extend(this, userData);
      }

    };

    return User;
  }

);