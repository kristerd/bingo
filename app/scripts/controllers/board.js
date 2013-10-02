'use strict';

angular.module('bingoApp')
  .controller('BoardCtrl', function ($scope, $routeParams, Bingogame, Bingoboard, angularFire) {
    
  	var boardId = $routeParams.boardId,
  		gameId = $routeParams.gameId,
  		ref = new Firebase('https://beerbingo.firebaseio.com/'+gameId+"/boards/"+boardId),
  		game = new Firebase('https://beerbingo.firebaseio.com/'+gameId);

  		angularFire(ref, $scope, 'board');
  		angularFire(game, $scope, 'game');
 });
