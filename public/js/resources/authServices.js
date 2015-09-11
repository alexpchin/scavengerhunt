 angular.module('scavengerHunt')
 .service('auth', authService)

 authService.$inject = ['$window' , 'jwtHelper']
 function authService($window, jwtHelper) {

  var self = this;

  // Add JWT methods here
  // Saving the token as 

  self.parseJwt = function(token) {
    return jwtHelper.decodeToken(token);
  }

  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  }

  // Check that it is the right token if the token is validated run the functon
  // sets the date for expiration for the token 

  self.isAuthed = function() {
    var token = self.getToken();
    if(token) {
      var params = self.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }
  // Removes the token

  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
  }

}