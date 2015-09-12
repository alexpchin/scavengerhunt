angular
  .module('scavengerHunt')
  .factory('User', User);

User.$inject = ['$resource'];

function User ($resource) {

 var url = 'http://localhost:3000/api/auth'

 var UserResource = $resource(
    url + ':id',
    {id: '@_id'},
    { 'update': { method: 'PUT' },
    'signin': { url: url + '/signin', method: 'POST' },
    'signup': { url: url + '/signup', method: 'POST' }
 });

 return UserResource;

}