rows = 3;
cols = 3;

x = 'x';
o = 'o';

board = []

for (let i = 0; i < rows; i++) {
    board[i] = []
    for (let j = 0; j < cols; j++) {
        board[i].push(cell());
    }
}

function cell() {
    let value = '0';

    const addToken = (token) => value = token;

    const getValue = () => value;

    return { addToken, getValue };
}
// board.map(row => row.map(cell => cell.getValue())).forEach(row => console.log(row));
// board.map(row => row.map(cell => cell.getValue()));

board[0][1].addToken(x);
board.forEach(row => console.log(row.map(cell => cell.getValue())));
console.log(board[0][1].getValue());
console.log(board);
