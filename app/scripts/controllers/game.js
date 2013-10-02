'use strict';

angular.module('bingoApp')
  .controller('GameCtrl', function ($scope, $routeParams, Bingogame, Bingoboard, angularFire) {

  	var gameId = $routeParams.gameId,
  		ref = new Firebase('https://beerbingo.firebaseio.com/'+gameId),
  		poolRef = new Firebase('https://beerbingo.firebaseio.com/'+gameId+"/numbersDrawn"), 
  		game;


  	$scope.lastNumber;

	angularFire(ref, $scope, 'game');

  	ref.once('value', function(snapshot) {
		game = Bingogame.getGameObj(snapshot.val());
	});	

	ref.on('value', function(snapshot) {
		game = Bingogame.getGameObj(snapshot.val());
		$scope.lastNumber = game.getLastNumbers(1);
	});	
    
  	$scope.drawNumber = function() {
  		testAnim("bounce");
  		game.bingo = false;
  		var wait = window.setTimeout( function(){
  			playDing();
			if(game.drawNumber().bingo) {
	  			alert("BINGO");
	  			game.bingo = true;
  			}
  			game.update();
		},400
		);
  		
  	}

  	function playDing() {
  		var snd = new Audio("audio/glassy_ding_or_bell.mp3"); // buffers automatically when created
		snd.play();
  	}

  	function testAnim(x) {
		$('#ball').removeClass().addClass(x + ' animated');
		var wait = window.setTimeout( function(){
			$('#ball').removeClass()},
			1300
		);
	}

  	function markBoards(boards, numbers) {
  		var i;

  		for (i = 0; i < boards.length; i++) {
  			markBoard(boards[i].numbers, numbers);
  		}
  	}

  	function markBoard(board, numbers) {
  		var i,
			y,
			z,
			row;

		for (z = 0; z < board.length; z++) {
			row = board[z];
			for (i = 0; i < row.length; i++) {
				for (y = 0; y < numbers.length; y++) {
					if (row[i] === numbers[y]) {
						$(".number_"+numbers[y]).addClass("green");
					}
				}
			}
		}
  	}
  	
  });
