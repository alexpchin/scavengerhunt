  angular.module('scavengerHunt')
 .factory('authInterceptor', authInterceptor)

 function authInterceptor(API, auth) {
   return {
   // automatically attach Authorization header
   request: function(config) {
     var token = auth.getToken();
     if(config.url.indexOf(API) === 0 && token) {
       config.headers.Authorization = 'Bearer ' + token;

     }
     return config;
   },
   // If a token was sent back, save it so we dont have to keep  on making requests
   response: function(res) {
     if(res.config.url.indexOf(API) === 0 && res.data.token) {
      auth.saveToken(res.data.token);
    }
    return res;
  }
}}