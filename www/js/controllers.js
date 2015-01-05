angular.module('starter.controllers', ['ngRoute','ngStorage'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Login) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    console.log(Login.login($scope.loginData));
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('LatestController', function($scope, LatestMovies) {

   LatestMovies.get().then(function( res ){
      $scope.latest = res;
   })
  
})

.controller('MoviesController', function($scope, $localStorage, Movies) {
    
    $scope.form = [];
    
    $scope.advanced_filters = false;
    $scope.showFilter  = function(){
        $scope.advanced_filters = !$scope.advanced_filters;
    }
    
    var generes = ['All','Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama',
                   'Family','Fantasy','History','Horror','Musical','Mistery','Romance','Sci-Fi','Short','Sport',
                   'Thriler', 'War', 'Western'
                  ];
    
    var quality = ['All','1080p', '720p', '3D'];
    var order = ['All','Latest','Oldest','Size','Ragin','Year','Seeds', 'Peers'];
    
    $scope.generes = generes;
    $scope.quality = quality;
    $scope.order = order;
    
    
    $scope.filter = function() {
      
        Movies.filter($scope.form).then(function( res ) {
           $scope.movies = res.MovieList;
        })
    }
    
    // localStorage is empty when app is running for the first time
    if (!$localStorage.movies) {
        Movies.get(false,1).then(function( res ) {
            // save in localStorage 
           $localStorage.movies = res.MovieList;
            // save the time
            $localStorage.movies_update = new Date().getHours();
           $scope.movies = res.MovieList;
        })
    } else {
        // get current time
        var current_hour = new Date().getHours();
        // if current time is diffrent than last update time then refresh localStorage
            if (current_hour != $localStorage.movies_update) {
              // delete previous data
              delete $localStorage.movies;
              Movies.get(false,1).then(function( res ) {
              $localStorage.movies = res.MovieList; 
              $localStorage.movies_update = new Date().getHours();
              $scope.movies = res.MovieList;
            })
        }
        $scope.movies = $localStorage.movies;
    }
    
    $scope.set = 1;
     $scope.next = function() {
        $scope.set = $scope.set + 1;
        Movies.get(false,$scope.set).then(function( res ) {
        var storage_movies = $localStorage.movies;
        var new_movies = res.MovieList;
        var all_together = storage_movies.concat(new_movies);    
        
        $localStorage.movies = all_together; 
        $scope.movies = $localStorage.movies;
        
    })
     }
                                          
})
.controller('MovieInfoController',function($scope, $stateParams, $localStorage, Movies) {
        
    var current_id = $stateParams.id;
    if (!$localStorage[current_id]) {
        
        Movies.get($stateParams.id).then(function( res ) {
        $scope.movie = res;
        $localStorage[current_id] = res;
    })
    } else {
        $scope.movie = $localStorage[current_id];
    }
    
    
})


.controller('Music',  function($scope, $cordovaMedia)  {

})
.controller('DashboardController', function($scope){
    $scope.welcome = "Welcome to our App";
}) 
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
