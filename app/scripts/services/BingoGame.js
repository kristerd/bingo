'use strict';

angular.module('bingoApp')
  .factory('Bingogame', function Bingogame(angularFire, Bingoboard) {
    
    var bingoRef = new Firebase('https://beerbingo.firebaseio.com/');

    var BingoGame = function() {
		console.log("New BingoGame created");
	};

	BingoGame.prototype.init = function(name) {
		this.name = name;
		this.boards = new Array();
		this.numberPool = new Array();
		this.numbersDrawn = new Array();
		this.rowsWinning = 1;
		this.status = "future";

		this.generateNumberPool();
		this.numbersDrawn.push("F");
		this.boards = [];
	}

	BingoGame.prototype.getStatus = function() {
			return this.status;
	}

	BingoGame.prototype.addBoard = function(board) {
		this.boards.push(board);
		console.log(board + " added. Now it is " + this.boards.length + " in total");
	}

	BingoGame.prototype.generateNumberPool = function() {

		var i;

		for (i = 0; i<75; i++) {
			this.numberPool.push(i+1);
		}
	}

	BingoGame.prototype.drawNumber = function() {

		var number,
			returnObj = {};

		number = this.numberPool.splice(Math.floor((Math.random()*this.numberPool.length)), 1)[0];

		console.log(number + " is drawn. " + this.numberPool.length + " numbers left in the pool.");

		this.numbersDrawn.push(number);

		returnObj.number = number;

		if(this.checkIfBingo()) {
			returnObj.bingo = true;
		}
		else {
			returnObj.bingo = false;
		}

		return returnObj;
	}

	BingoGame.prototype.checkIfBingo = function() {
		var i,
			bingo = 0;

		for (i = 0; i < this.boards.length; i++) {
			if (this.boards[i].checkWinnings(this)) {
				if (this.boards[i].getNumberOfFullRows() >= this.rowsWinning) {

					this.rowsWinning++; // Next time, one you need one more row to get BINGO

					if (this.rowsWinning > 5 || this.numbersDrawn.length === 75) {
						this.status = "finished";
					}
					bingo++; // BINGO!
				}
				else {
					// Too late for Bingo
				}
			}
		}

		if(bingo > 0) {
			return true;
		}
		else {
			return false;
		}
	}

	BingoGame.prototype.getLastNumbers = function(i) {
		var sliced,
			min = (this.numbersDrawn.length)-i,
			max = this.numbersDrawn.length;

		if (min<0) {
			min = 0;
		}

		sliced = this.numbersDrawn.slice(min, max);

		console.log(sliced);
		return sliced;
	}

	BingoGame.prototype.printBoards = function() {

		var i;
		console.log(this.boards);
		for (i = 0; i < this.boards.length; i++) {
			this.boards[i].print();
		}
	}

	BingoGame.prototype.save = function() {
		var game = bingoRef.push(this);
  		bingoRef.child(game.name()).update({id: game.name()});
	}

	BingoGame.prototype.update = function() {
		bingoRef.child(this.id).update(this);
	}

	return {
		createNewGame: function(name) {
			var game = new BingoGame();

			game.init(name);

			return game;
		},
		getGameObj: function(obj) {
			var game = new BingoGame(),
				i;

			game.id = obj.id;
			game.name = obj.name;
			game.boards = new Array();
			game.numberPool = obj.numberPool;
			game.numbersDrawn = obj.numbersDrawn;
			game.rowsWinning = obj.rowsWinning;
			game.status = obj.status;

			if(obj.boards !== undefined) {
				for (i = 0; i < obj.boards.length; i++) {
					game.boards.push(Bingoboard.createBoard(obj.boards[i]));
				}
			}

			console.log(game);

			return game;
		},
		getGames: function() {

		}
	}
});
