// Add event Listener for 'DOMContentLoaded' to initialize the game when the page is loaded.
document.addEventListener("DOMContentLoaded", () => {
    let board = document.getElementById("board");
    let status = document.getElementById("status");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create cells and add click event listerner
    for (let i = 0; i < 9 ; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            updateBoard();
            if (checkWinner()) {
                status.textContent = `${currentPlayer} wins!`;
            } else if (gameBoard.every(cell => cell !== "")) {
                status.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "0" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Update the visual representation of the board
    function updateBoard() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    // Check for the winner 
    function checkWinner() {
        let winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                highlightWinningCells(pattern);
                return true;
            }
        }
        return false;
    }

    // Highlight the winning cells
    function highlightWinningCells(pattern) {
        let cells = document.querySelectorAll(".cell");
        pattern.forEach(index => {
            cells[index].classList.add('winner');
            cells[index].classList.add(gameBoard[index]);
        });
    }

    // Reset the game
    window.resetGame =- function () {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.classList.remove("winner", "X", "O");
            cell.textContent = "";
        });
    };
    
});