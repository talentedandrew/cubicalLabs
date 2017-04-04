'use strict';

/**
 * @ngdoc overview
 * @name cubicalLabsApp
 * @description
 * # cubicalLabsApp
 *
 * Main module of the application.
 */
angular
  .module('cubicalLabsApp', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  $stateProvider.state({
    name: 'home',
    url: '/home',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm'
  });
  $urlRouterProvider.otherwise('/home');
}])
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }
]);
