var turn = 0;
var player = "X";
var board = [['','',''],
			['','',''],
			['','','']];
var body = document.getElementsByTagName("body")[0];
var wrapper = document.createElement("div");

function renderBoard() {
	for (var i=0; i<3; i++) {
		var row = document.createElement("div");
		for (var j=0; j<3; j++) {
			var cell = document.createElement("div");
			row.appendChild(cell); 	
			cell.addEventListener("click", move, false);
			cell.className = "square";
			cell.id = i + "-" + j;
		}
		wrapper.appendChild(row);
		row.className = "row";
	}
	body.appendChild(wrapper);
	wrapper.className = "wrapper";
}

function move() {
	var squareId = this.id;
	var array = squareId.split('-'), a = array[0], b = array[1];
	this.removeEventListener("click", move, false);
	this.innerText = player;
	board[a][b] = player;
	checkWin(player);
	turn++;
	if (player === "X") {
		player = "O";
	} else {
		player = "X";
	}
}

function checkWin(symbol) {	
	for (var i=0; i<board.length; i++) { 
		if ((board[i][0] === symbol &&
		board[i][1] === symbol &&
		board[i][2] === symbol) ||

		(board[0][i] === symbol &&
		board[1][i] === symbol &&
		board[2][i] === symbol)){
			gameWon(true);} 
	}

	if ((board[0][0] === symbol &&
		board[1][1] === symbol &&
		board[2][2] === symbol) ||

		(board[0][2] === symbol &&
		board[1][1] === symbol &&
		board[2][0] === symbol)) {
			gameWon(true);
	} else if (turn === 8) {
		gameWon(false);
	} else {
		return;
	}
}

function gameWon(x) {
	var reset = document.createElement("button");
	var resetText = document.createTextNode("Rematch!");
	var squares = document.getElementsByClassName("square");

	reset.addEventListener("click", function(){location.reload()});
	reset.className = "button";
	reset.appendChild(resetText);
	wrapper.appendChild(reset);
	body.appendChild(wrapper);
	for (var i=0; i<squares.length; i++){
		squares[i].removeEventListener("click", move, false);
	}
	if (x === true)	{	
		window.alert(player+ " won!");
	} else {
		window.alert("Cat's game!  No winners!");
	}
}
renderBoard();