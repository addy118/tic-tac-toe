// CONSOLE VERSION

function GameBoard() {
    rows = 3;
    cols = 3;

    board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markMove = (row, col, move) => {
        if (board[row][col].getValue() === null) {
            board[row][col].addToken(move)
            return true;
        } else {
            console.log('Invalid Move');
            return false;
        }
    };

    const printBoard = () => board.map(row => row.map(cell => cell.getValue()))
        .forEach(row => console.log(row));
    // board.forEach(row => console.log(row.map(cell => cell.getValue())));

    const clearBoard = () => board.map(row => row.map(cell => cell.addToken(null)));

    return { getBoard, markMove, clearBoard, printBoard }
}


function Cell() {
    let value = null;

    const addToken = (token) => value = token;
    const getValue = () => value;

    return { addToken, getValue };
}


function GameController(
    playerOne = 'Player One',
    playerTwo = 'Player Two'
) {
    const board = GameBoard();

    players = [
        {
            name: playerOne,
            move: 0,
        },
        {
            name: playerTwo,
            move: 1,
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;
    console.log(getActivePlayer())

    const switchPlayerTurn = () => activePlayer.name === playerOne ? activePlayer = players[1] : activePlayer = players[0];

    const printRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);
        board.printBoard();
    }

    const checkWinner = (board) => {
        for (let i = 0; i < 2; i++) {

            // Check rows
            for (let row = 0; row < 3; row++) {
                if (board[row][0].getValue() === i &&
                    board[row][1].getValue() === i &&
                    board[row][2].getValue() === i) {
                    return players[i];
                }
            }

            // Check columns
            for (let col = 0; col < 3; col++) {
                if (board[0][col].getValue() === i &&
                    board[1][col].getValue() === i &&
                    board[2][col].getValue() === i) {
                    return players[i];
                }
            }

            // Check diagonals
            if (
                (board[0][0].getValue() === i &&
                    board[1][1].getValue() === i &&
                    board[2][2].getValue() === i) ||
                (board[0][2].getValue() === i &&
                    board[1][1].getValue() === i &&
                    board[2][0].getValue() === i)
            ) {
                return players[i];
            }
        }

        return null;
    }

    const reset = () => {
        board.clearBoard();
        activePlayer = players[0];
        printRound();
    };

    const playRound = (row, col) => {
        if (!board.markMove(row, col, getActivePlayer().move)) {
            printRound();
            return;
        };

        winner = checkWinner(board.getBoard());
        if (winner) {
            console.log(`${checkWinner(board.getBoard()).name} is the winner!`);
            reset();
            return;
        } else {
            switchPlayerTurn();
            printRound();
        }
    }

    printRound();

    return { playRound, reset }
}

// user's can only use the playRound and reset methods of GameController from the console.
const game = GameController();
