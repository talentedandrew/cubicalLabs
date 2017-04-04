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

'use strict';

/**
 * @ngdoc function
 * @name cubicalLabsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cubicalLabsApp
 */
angular.module('cubicalLabsApp')
  .controller('MainCtrl',['$http','$sce', function ($http,$sce) {
    var vm = this;
    vm.showoverlay = false;
    vm.showartistlink = true;
    vm.showtabs = false;
    vm.artist={};
    vm.name = /^jack$/i ;
    vm.track = /^4$/;
    vm.getTracks = function(artistForm){
      $http({
        method: 'jsonp',
        url:$sce.trustAsResourceUrl('http://itunes.apple.com/search?term='+vm.artist.name.toLowerCase()+'&limit='+vm.artist.track)
        })
      .then(function(response){
        console.log(response);
        vm.artists = response.data.results;
        vm.showoverlay = false;
        vm.showartistlink = false;
        vm.showtabs = true;
      })
      .catch(function(error){
        vm.showoverlay = false;
        vm.showartistlink = true;
        vm.showtabs = false;
        vm.artist={};
      });
      artistForm.$setPristine();    
      artistForm.$setUntouched();
    }
  }]);

angular.module('cubicalLabsApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"home\"> <div id=\"gui\"></div> <div id=\"canvas-container\"> <div id=\"mountains2\"></div> <div id=\"mountains1\"></div> <div id=\"skyline\"></div> </div> <a class=\"searchArtist\" ng-class=\"{'hideMe': !vm.showartistlink}\" ng-click=\"vm.showoverlay = !vm.showoverlay\">Search Artist</a> <a ng-click=\"vm.showoverlay = false;vm.showartistlink=true;vm.showtabs=false;vm.artist={};\" class=\"goHome\" ng-if=\"vm.showoverlay || vm.showtabs\">x</a> <div class=\"searchContainer\" ng-class=\"{'hideMe': !vm.showoverlay}\"> <form class=\"form-horizontal\" name=\"artistForm\" novalidate ng-submit=\"artistForm.$valid && vm.getTracks(searchContainer);\" role=\"form\"> <div class=\"form-group\"> <label for=\"inputEmail3\" class=\"col-md-4 col-sm-4 control-label\">Name</label> <div class=\"col-md-8 col-sm-8\"> <input ng-class=\"{'has-error':(artistForm.name.$error.required || artistForm.name.$error.pattern) && artistForm.$submitted}\" type=\"text\" required ng-pattern=\"vm.name\" ng-model=\"vm.artist.name\" class=\"form-control\" id=\"name\" name=\"name\" placeholder=\"Artist Name\"> </div> </div> <div class=\"form-group\"> <label for=\"inputEmail3\" class=\"col-md-4 col-sm-4 control-label\">No. Of Tracks</label> <div class=\"col-md-8 col-sm-8\"> <input ng-class=\"{'has-error':(artistForm.track.$error.required || artistForm.track.$error.pattern) && artistForm.$submitted}\" type=\"text\" ng-pattern=\"vm.track\" required ng-model=\"vm.artist.track\" class=\"form-control\" id=\"number\" name=\"track\" placeholder=\"No. Of tracks\"> </div> </div> <div class=\"form-group\"> <div class=\"col-sm-offset-1 col-sm-10 text-center\"> <button type=\"submit\" class=\"searchArtist\">Sign in</button> </div> </div> </form> </div> <div class=\"tabsContainer\" ng-class=\"{'hideMe': !vm.showtabs}\"> <uib-tabset active=\"activeForm\"> <uib-tab ng-repeat=\"artist in vm.artists\" index=\"$index\" heading=\"{{artist.artistName}}\"> <table class=\"table table-hover\"> <tbody> <tr> <td class=\"col-md-4\"><strong>Artist</strong></td> <td class=\"col-md-8\">{{artist.artistName}}</td> </tr> <tr> <td class=\"col-md-4\"><strong>Collection Name</strong></td> <td class=\"col-md-8\">{{artist.collectionName}}</td> </tr> <tr> <td class=\"col-md-4\"><strong>Track Name</strong></td> <td class=\"col-md-8\">{{artist.trackName}}</td> </tr> <tr> <td class=\"col-md-4\"><strong>Country</strong></td> <td class=\"col-md-8\">{{artist.country}}</td> </tr> <tr> <td class=\"col-md-4\"><strong>Cover</strong></td> <td class=\"col-md-8\"><img ng-src=\"{{artist.artworkUrl100}}\" alt=\"{{artist.collectionName}}\"></td> </tr> <tr> <td class=\"col-md-4\"><strong>Collection Name</strong></td> <td class=\"col-md-8\">{{artist.longDescription}}</td> </tr> </tbody> </table> </uib-tab> </uib-tabset> </div> </div>"
  );

}]);
