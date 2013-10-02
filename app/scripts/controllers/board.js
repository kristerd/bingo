'use strict';

angular.module('bingoApp')
  .controller('BoardCtrl', function ($scope, $routeParams, Bingogame, Bingoboard, angularFire) {
    
  	var boardId = $routeParams.boardId,
  		gameId = $routeParams.gameId,
  		ref = new Firebase('https://beerbingo.firebaseio.com/'+gameId+"/boards/"+boardId),
  		game;

  		angularFire(ref, $scope, 'board');
 });
