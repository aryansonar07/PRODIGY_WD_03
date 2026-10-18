var cells = document.getElementsByClassName("cell");
var message = document.getElementById("message");
var resetButton = document.getElementById("reset");
var gameMode = document.getElementById("mode");
var currentPlayer = "X";
var gameOver = false;
var computerTimer;

var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var a = winningCombinations[i][0];
        var b = winningCombinations[i][1];
        var c = winningCombinations[i][2];

        if (cells[a].innerHTML !== "" &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML) {
            message.innerHTML = "Player " + currentPlayer + " wins!";
            gameOver = true;
            return;
        }
    }

    var draw = true;

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            draw = false;
        }
    }

    if (draw) {
        message.innerHTML = "It's a draw!";
        gameOver = true;
    }
}

function computerMove() {
    var emptyCells = [];

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            emptyCells.push(cells[i]);
        }
    }

    if (emptyCells.length > 0 && gameOver === false) {
        var randomNumber = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomNumber].innerHTML = "O";
        currentPlayer = "O";
        checkWinner();

        if (gameOver === false) {
            currentPlayer = "X";
            message.innerHTML = "Your turn (X)";
        }
    }
}

for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
        if (this.innerHTML === "" && gameOver === false &&
            (gameMode.value === "two-player" || currentPlayer === "X")) {
            this.innerHTML = currentPlayer;
            checkWinner();

            if (gameOver === false) {
                if (gameMode.value === "two-player") {
                    if (currentPlayer === "X") {
                        currentPlayer = "O";
                    } else {
                        currentPlayer = "X";
                    }
                    message.innerHTML = "Player " + currentPlayer + "'s turn";
                } else {
                    currentPlayer = "O";
                    message.innerHTML = "Computer is thinking...";
                    computerTimer = setTimeout(computerMove, 500);
                }
            }
        }
    };
}

function resetGame() {
    clearTimeout(computerTimer);

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }

    currentPlayer = "X";
    gameOver = false;
    if (gameMode.value === "two-player") {
        message.innerHTML = "Player X's turn";
    } else {
        message.innerHTML = "Your turn (X)";
    }
}

resetButton.onclick = resetGame;
gameMode.onchange = resetGame;
