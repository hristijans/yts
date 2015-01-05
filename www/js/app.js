// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
               ['ionic', 
                'starter.controllers',
                'starter.services',
                'ngCordova',
                'ngRoute',
                'ngStorage',
                'ngResource',
                'angular-loading-bar'
               ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

.state('app.dashboard', {
  url:"/dashboard",
  views: {
     'menuContent' :{
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardController'
        }
  }

})

.state('app.latest', {
  url:"/latest",
  views: {
     'menuContent' :{
          templateUrl: "templates/latest.html",
          controller: 'LatestController'
        }
  }

})
 
  .state('app.movies', {
      url: "/movies",
      views: {
        'menuContent' :{
          templateUrl: "templates/listmovies.html",
          controller: 'MoviesController'
        }
      }
    })
    .state('app.single', {
      url: "/movies/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/movieinfo.html",
          controller: 'MovieInfoController'
        }
      }
    })

    .state('app.music', {
      url: "/music",
      views: {
        'menuContent' :{
          templateUrl: "templates/music.html",
          controller: 'Music'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});

