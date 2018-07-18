//initialize variables

let currentPlayer = "Blue player";
let nextPlayer = "Grey player";

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

var playerRedSelections = new Array();
var playerBlackSelections = new Array();


handleClick = function (event) {
    var cell = event.target
    console.log(getCellLocation(cell.id)[0])

    for (let i = 5; i >= 0; i--) {
        var column = getCellLocation(cell.id)[1]
        if (board[i][column] == 0) {

            board[i][column] = currentPlayer;
            cell = document.getElementById(i * 7 + column);

            if (currentPlayer === "Blue player") {
                playerSelections = playerRedSelections;
                cell.style.backgroundColor = "LightBlue";
                nextPlayer = "Grey player";
            } else {
                playerSelections = playerBlackSelections;
                cell.style.backgroundColor = "DarkGrey";
                nextPlayer = "Blue player";
            }

            if (checkWinner(currentPlayer)) {
                alert(currentPlayer + " wins!")
                resetGame();
            }

            playerSelections.push(parseInt(cell.id));

            // Swap players
            let temp = currentPlayer;
            currentPlayer = nextPlayer;
            temp = nextPlayer;
            break;
        }
    }
}

//functions

function getCellLocation(id) {
    return [Math.floor(id / 7), (id % 7)]
}

function checkWinner(currentPlayer) {
    if(checkHorizontal(currentPlayer) || 
    checkVertical(currentPlayer) || 
    checkUpDiagonal(currentPlayer) ||
    checkDownDiagonal(currentPlayer))
    return true;
    else{
        return false;
    }
}

function checkHorizontal(currentPlayer) {
    for (let x = 0; x < board.length; x++) {
        let matches = 0;
        for (let y = 0; y < board[x].length; y++) {
            console.log("Matches: " + matches);
            if (board[x][y] == currentPlayer) {
                matches++;
            } else {
                matches = 0;
            }
            if (matches == 4) {
                console.log("Win");
                return true;
            }
        }
    }
}

function checkVertical(currentPlayer) {
    for (let y = 0; y < board[0].length; y++) {
        let matches = 0;
        for (let x = 0; x < board.length; x++) {
            console.log("Matches: " + matches);
            if (board[x][y] == currentPlayer) {
                matches++;
            } else {
                matches = 0;
            }
            if (matches == 4) {
                console.log("Win");
                return true;
            }
        }
    }
}

function checkUpDiagonal(currentPlayer) {
    for (let x = 0; x < board.length-3; x++) {
        let matches = 0;
        for (let y = 0; y < board[x].length-3; y++) {
            //console.log("Matches: " + matches);
            for (var i = 0; i < 4; i++) {
                if (board[x + i][y + i] == currentPlayer) {
                    matches++;
                } else {
                    matches = 0;
                }
                if (matches == 4) {
                    console.log("Win");
                    return true;
                }
            }
        }
    }
}

function checkDownDiagonal(currentPlayer) {
    for (let x = 0; x < board.length-3; x++) {
        let matches = 0;
        for (let y = 0; y < board[x].length-3; y++) {
            //console.log("Matches: " + matches);
            for (var i = 0; i < 4; i++) {
                if (board[x + i][y - i] == currentPlayer) {
                    matches++;
                } else {
                    matches = 0;
                }
                if (matches == 4) {
                    console.log("Win");
                    return true;
                }
            }
        }
    }
}

function resetGame() {
    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    playerRedSelections = new Array();
    playerBlackSelections = new Array();

    var cells = document.querySelectorAll("td");

    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }

    console.log("reset");
}

//add event listener

var cells = document.querySelectorAll("td");

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}