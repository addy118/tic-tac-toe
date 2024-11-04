

const players = [
    { name: "playerOne", move: 0 },
    { name: "playerTwo", move: 1 }
];

board = [
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
];

function checkWinner(board, players) {
    for (let i = 0; i < 2; i++) {

        // Check rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === i && board[row][1] === i && board[row][2] === i) {
                return players[i];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === i && board[1][col] === i && board[2][col] === i) {
                return players[i];
            }
        }

        // Check diagonals
        if (
            (board[0][0] === i && board[1][1] === i && board[2][2] === i) ||
            (board[0][2] === i && board[1][1] === i && board[2][0] === i)
        ) {
            return players[i];
        }
    }

    return null;
}

const winner = checkWinner(board, players);
console.log(winner);

