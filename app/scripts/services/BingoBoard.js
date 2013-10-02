'use strict';

angular.module('bingoApp')
  .service('Bingoboard', function Bingoboard() {
    
    var BingoBoard = function(board, owner) {
			if(board === null) {
				console.log("new board");
				this.owner = owner;
				this.numbers = new Array();
				this.fullRows = 0;
				this.generateBoardNumbers();
			}
			else {
				console.log("old board");
				this.owner = board.owner;
				this.numbers = new Array();
				this.numbers = board.numbers;
				this.fullRows = board.fullRows;
			}
		}

		BingoBoard.prototype.checkWinnings = function(game) {

			var i,
				full = 0;

			for (i = 0; i < this.numbers.length; i++) {
				if(i===4) console.log(this.numbers);
				if(this.checkRow(this.numbers[i], game.numbersDrawn)) {
					full++;
				};
			}

			if (full>0) {
				this.fullRows = full;
				return true;
			}

			return false;
		}

		BingoBoard.prototype.checkRow = function(row, numbers) {
			var i,
				y,
				match = 0;

			for (i = 0; i < row.length; i++) {
				for (y = 0; y < numbers.length; y++) {
					if (row[i].number === numbers[y]) {
						match++;
						row[i].selected = true;
					}
				}
			}

			if (match === 5) {
				return true;
			}
			else {
				return false;
			}
		}

		BingoBoard.prototype.getNumberOfFullRows = function() {
			return this.fullRows;
		}

		BingoBoard.prototype.getOwner = function() {
			return this.owner;
		}

		BingoBoard.prototype.generateBoardNumbers = function() {

			var currentRow,
				max,
				min,
				i,
				y,
				random,
				drawnNumbers = new Array(),
				numberObj;

			for(i = 1; i < 6; i++) {
				currentRow = new Array();
				min = 1;
				max = 15;
				for(y = 1; y < 6; y++) {
					numberObj = {};
					if (i === 3 && y === 3) {
						random = "F";
					}
					else {
						max = 15*y;
						do {
							random = getRandomInt(min, max);
						}
						while (drawnNumbers.indexOf(random, 0) !== -1);
					}

					numberObj.number = random;
					numberObj.selected = false;

					currentRow.push(numberObj);
					drawnNumbers.push(random);
					min = max+1;
				}
				console.log(currentRow);
				this.numbers.push(currentRow); // A full row! Push it to the board-array.
			}

			function getRandomInt (min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
		}

		BingoBoard.prototype.print = function() {
			var html,
				i,
				y;

			html = "<div class='bingo-board'>";
			html += "<div class='top-row row'>" +
						"<div class='B'>B</div>"+
						"<div class='I'>I</div>" +
						"<div class='N'>N</div>" +
						"<div class='G'>G</div>"+
						"<div class='O'>O</div>" +
					"</div>";
			for (i = 0; i<this.numbers.length; i++) {
				html += "<div class='row row"+(i+1)+"'>";
				for (y = 0; y<this.numbers[i].length; y++) {
					html += "<div class='number_"+ this.numbers[i][y] +" col"+(y+1)+"'>";
					html += this.numbers[i][y];
					html += "</div>";
				}
				html += "</div>";
			}
			html += "</div>";

			$("#board").append(html);
		}

		return {
			createBoard: function(board, owner) {
				return new BingoBoard(board, owner);
		}
	}
  });
