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

    const markMove = (row, col, move) => board[row][col].addToken(move);

    const printBoard = () => board.map(row => row.map(cell => cell.getValue()))
        .forEach(row => console.log(row));
    // board.forEach(row => console.log(row.map(cell => cell.getValue())));

    return { getBoard, markMove, printBoard }
}


function Cell() {
    let value = '-';

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
            move: 'x',
        },
        {
            name: playerTwo,
            move: 'o',
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

    const playRound = (row, col) => {
        const playerMove = getActivePlayer().move;
        board.markMove(row, col, playerMove);
        switchPlayerTurn();
        printRound();
    }

    printRound();

    return { playRound, getActivePlayer }
}

const game = GameController();
