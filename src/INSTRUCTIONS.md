# Tic Tac Toe

## Example
Create a new game
```ts
const game = new TicTacToe()
```

Starts with X by default
```ts
game.getStatus()
// => "Ongoing - X's turn"
```

Play a counter in a given row and column
```ts
game.addMarker({ row: 1, col: 2 })
```

Check the current board placements
```ts
game.getBoard()
// => [['', 'X', ''], ['', '', ''], ['', '', '']]
```

Keep playing
```ts
game.addMarker({ row: 2, col: 2 })
game.addMarker({ row:1, col: 3 })

game.getBoard()
// => [['', 'X', 'X'], ['', 'O', ''], ['', '', '']]

game.getStatus()
// => "Ongoing - O's turn"

game.addMarker({ row: 3, col: 2 })
game.addMarker({ row: 1, col: 1 })
game.getBoard()
// => [['X', 'X', 'X'], ['', 'O', ''], ['', 'O', '']]

game.getStatus()
// => "Finished - X is the winner!"
```


## Setup
Clone repository
```bash
git clone git@github.com:WeAreAcademy/mark-oop-proj--tic-tac-toe.git
```

Change into directory
```bash
cd mark-oop-proj--tic-tac-toe
```

Install dependencies
```bash
yarn
```

### To play locally
Open `ts-node` REPL (prequisite: global installation of `ts-node`; do with `npm install -g ts-node`)
```bash
ts-node
```

In `ts-node` REPL, load the game file
```bash
> .load src/tic-tac-toe.ts
```

*Ready to play in the TS console!*