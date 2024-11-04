function Gameboard() {
    // define the board boundaries
    const rows = 6;
    const columns = 7;
    const board = [];

    // creates 2d array for board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // gets the current board array
    const getBoard = () => board;

    // finds the last empty cell and adds the player's token
    const dropToken = (column, player) => {
        const availableCells = board
            .filter(row => row[column].getValue() === 0)
            .map(row => row[column]);

        // error move
        if (!availableCells.length) return;

        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    };

    // shows board on console
    const printBoard = () => {
        const boardWithCellValues = board
            .map(row => row.map(cell => cell.getValue()))

        console.log(boardWithCellValues);
    };

    return { getBoard, dropToken, printBoard };
}

function Cell() {
    // initial cell value
    let value = 0;

    // adds player token to particular cell
    const addToken = (player) => { value = player; };

    // returns the value of a particular cell
    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    // to use the methods returned in Gameboard()
    const board = Gameboard();

    // store players to acces their properties
    const players = [
        { name: playerOneName, token: 1 },
        { name: playerTwoName, token: 2 }
    ];

    // the active player is the first one by default
    let activePlayer = players[0];

    // simply switches the turn of players
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // returns the current active player
    const getActivePlayer = () => activePlayer;

    // prints the raw board in console
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // the ultimae method to play the move
    const playRound = (column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);
        board.dropToken(column, getActivePlayer().token);
        switchPlayerTurn();
        printNewRound();
    };

    // to show the board to players at beginning
    printNewRound();

    return { playRound, getActivePlayer };
}

const game = GameController();
