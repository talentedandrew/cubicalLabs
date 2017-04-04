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
