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

    

    
})