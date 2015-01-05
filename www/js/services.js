angular.module('starter.services', [])


.factory('LatestMovies', function LatestMovies($http) {

  var movies = [];
    return {
        get: function(){
      
           return $http.get("https://yts.re/api/upcoming").then(function(result){
               //modify collection of transactions...
               movies = result.data;
               return movies; // this is data ^^ in the controller
           });
        }
      }

    return movies;

})

.factory('UpcomingMovies', function UpcomingMovies($resource) {
    return $resource("https://yts.re/api/upcoming");
})

.factory('Movies', function Movies($http) {

  var movies = [];
    return {
        get: function(id, set){
      
            if (!id) {
           return   $http.get("https://yts.re/api/list?set="+set).then(function(result){
               //modify collection of transactions...
               movies = result.data;
               return movies; // this is data ^^ in the controller
           });
            }  else {
                   return   $http.get("https://yts.re/api/movie.json?id="+id).then(function(result){
               //modify collection of transactions...
               movies = result.data;
               return movies; // this is data ^^ in the controller
           });
            }
        },
         getWithLimit: function(limit){
               
           return   $http.get("https://yts.re/api/list.json?limit="+limit).then(function(result){
               //modify collection of transactions...
               movies = result.data;
               return movies; // this is data ^^ in the controller
           });
        
       
        
      },
        
        filter : function(data) {
              return   $http.get("https://yts.re/api/list.json?quality="+data.quality+"&genre="+data.genere+"&sort="+data.order).then(function(result){
               //modify collection of transactions...
               movies = result.data;
               return movies; // this is data ^^ in the controller
           });
        }
    
    
    }

    return movies;

})

.factory('Login',  function Login($http, $localStorage) {
    // login endpoint : http://yts.re/api/login
    var user = [];
    return {
        // data = {username: data.username, password:data.password}
         login: function(data){
           return   $http.post("https://yts.re/api/login.jsonp", data).then(function(result){
              $localStorage.user = result;
           });
         }
    }
    return user;
})



























