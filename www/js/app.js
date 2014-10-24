// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('hackathon', ['ionic', 'restangular', 'ngRoute', 'myFilters', 'myControllers', 'myServices']);

var TOKEN = '8ff1038759e0f9c36d463274226bb5d4a241a985f9ceae6e33b3f88bc454d08c';

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://api.paris.fr/api/data/1.0/');
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.config(function ($compileProvider){
  // Set the whitelist for certain URLs just to be safe
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/list', {
          templateUrl: 'views/list.html',
          controller: 'ListCtrl'
        })

        .when('/pool/:id?', {
          templateUrl: 'views/pool.html',
          controller: 'PoolCtrl'
        })

    $routeProvider.otherwise({
        redirectTo: '/list'
    });
}])



;