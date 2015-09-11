angular.module('scavengerHunt')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService'];
function UsersController(User, TokenService){
  var self = this;

  self.all = [];
  self.users = {};

  function handleRequest(res) {
    var token = res.data ? res.data.token : null;
    if(token) { console.log('JWT:', token); }
    self.message = res.data.message;
  }

  self.getUser = function(user) {
    self.getUser = User.get({id: user._id});
  };

  // self.addUser = function() {
  //   User.save(self.user, function(user) {
  //     self.users.push(user);
  //     self.user = {}
  //   })
  // };

  self.login = function() {
    User.authorize({email: self.email , password: self.password },function(response){
      // handleRequest(response)
      console.log(response);
    })
    // user.login(self.email, self.password)
    // .then(handleRequest, handleRequest)
  }
  self.register = function() {
    User.signup({email: self.email , password: self.password, full_name: self.full_name },function(response){
      console.log(response);
    })
    // user.register(self.email, self.password)
    // .then(handleRequest, handleRequest)
  }
  self.logout = function() {
    TokenService.logout && TokenService.logout()
  }
  self.isAuthed = function() {
    return TokenService.isAuthed ? TokenService.isAuthed() : false
  }

  return self
}