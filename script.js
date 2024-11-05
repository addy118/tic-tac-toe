// user's can only use the playRound and reset methods of GameController from the console.
const game = GameController();

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
    game.reset();
})

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

    // dom elements
    const result = document.querySelector('.result');
    const turn = document.querySelector('.turn');

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

    const switchPlayerTurn = () => activePlayer.name === playerOne ? activePlayer = players[1] : activePlayer = players[0];

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
        updateBoard();
        activePlayer = players[0];
        result.textContent = '\u00A0';
    };

    const playRound = (row, col) => {
        // play the move
        const move = board.markMove(row, col, getActivePlayer().move);

        // post-invalid move
        if (!move) {
            updateBoard();
            return;
        };

        const winner = checkWinner(board.getBoard());
        // post-last move (ie. winning move)
        if (winner) {
            result.textContent = `${checkWinner(board.getBoard()).name} is the winner!`;

            updateBoard();
            setTimeout(reset, 1500);
            return;
        }
        // post-normal move
        else {
            switchPlayerTurn();
            updateBoard();
        }
    }

    const renderBoard = () => {
        // show current player's turn
        turn.textContent = `${getActivePlayer().name}'s turn`;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const mainBoard = board.getBoard();

                const dom = document.querySelector('.board');

                const cell = document.createElement('div');
                cell.setAttribute('data-row', i);
                cell.setAttribute('data-col', j);
                cell.classList.add('cell');
                cell.textContent =
                    mainBoard[i][j].getValue() == null ? null :
                        mainBoard[i][j].getValue() == 0 ? 'X' : 'O';
                dom.appendChild(cell);

                // to make board available to play
                cell.addEventListener('click', (e) => {
                    const { row } = cell.dataset;
                    const { col } = cell.dataset;
                    playRound(row, col)
                })
            }
        }
    }

    const updateBoard = () => {
        document.querySelector('.board').innerHTML = '';
        renderBoard();
    }

    // initial render
    renderBoard();

    return { playRound, reset }
}
