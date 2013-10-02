'use strict';

angular.module('bingoApp')
  .controller('MainCtrl', function ($scope, $location, Bingogame, Bingoboard, angularFire) {

    //$scope.game = Bingogame.createGame("New Game");

    var ref = new Firebase('https://beerbingo.firebaseio.com/');
   	/*ref.once('value', function(snapshot) {
		$scope.items = snapshot.val();
	});*/
    angularFire(ref, $scope, 'items');

	$scope.draw = function() {
		$scope.game.drawNumber();

        $scope.awesomeThings = $scope.game.getLastNumbers(1);
		
		if ($scope.game.status !== "finished") {
			window.setTimeout(function() {
				$scope.$apply(function () {
					$scope.draw();
				});
	   	 	}, 200);
		}
	}

	$scope.pullFromHat = function() {
		$scope.game.drawNumber();

        $scope.awesomeThings = $scope.game.getLastNumbers(1);
	}

	$scope.newGame = function() {
		var game = Bingogame.createNewGame("Krister PARTY");
		game.save();
	}

	$scope.addBoardToGame = function(gameData) {

		var game = Bingogame.getGameObj(gameData),
			boardUrl = "/board/"+game.id+"/"+game.boards.length;
		var newBoard = Bingoboard.createBoard(null, "Krister");
		game.addBoard(newBoard);
		game.update();

		$location.path(boardUrl);
	}
 

  });
