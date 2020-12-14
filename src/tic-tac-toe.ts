/**
 * The public interface for the TicTacToe game.
 */
interface ITicTacToe {
  /**
   * A command that adds a marker for the turn player at coordinates specified, if possible.
   * 
   * If the coordinates are already occupied, it ignores the placement.
   */
  addMarker(position: BoardPosition): void

  /**
   * A query to read the current state of the Tic Tac Toe board.
   */
  getBoard(): Board

  /**
   * A helper query to describe the current status of the Tic Tac Toe game.
   * 
   * It returns a string which either announces the current winner of the game, or specifies that the game is ongoing (and states the current turn player).
   */
  getStatus(): string
}

/**
 * A Tic Tac Toe game.
 */
class TicTacToe implements ITicTacToe {
  board: Board

  /**
   * Initialise a new game with an empty board
   */
  constructor() {
    const emptyRow: Row = ['', '', '']
    this.board = [
      [...emptyRow],
      [...emptyRow],
      [...emptyRow]
    ]
  }

  addMarker(position: BoardPosition): void {
    if (this.readCell(position) === '') {
      this.writeCell(position, this.getTurnPlayer())
    } else {
      console.log("There's already a marker there - try placing somewhere else!")
    }
  }

  getBoard(): Board {
    return this.board
  }

  getStatus(): string {
    const winner = this.findWinner()
    if (winner) {
      return `Finished - ${winner} is the winner!`
    } else {
      return `Ongoing - ${this.getTurnPlayer()}'s turn`
    }
  }

  // TODO: make it easier for players to view the board
  printBoard(): void {
    // log an ASCII representation of the board
  }

  /**
   * A helper query to heck whether a series of board positions are all equal to a given marker.
   * 
   * This is useful, for example, to check whether a player has won in a given fashion - pass in an array of the positions e.g. for every cell in a row. 
   * 
   * @param marker The marker to check for equality to
   * @param positions A array of board positions to check
   */
  allEqualTo(marker: Marker, positions: BoardPosition[]): boolean {
    return positions.every(position => (
      this.readCell(position) === marker
    ))
  }


  /**
   * A helper query to return the board in a stylised ASCII format
   * @returns string, ASCII representation of board
   */
  boardString(): string {
    return this.board.map((val, idx) => (
      this.rowString(idx + 1)
    )).join('\n')
  }

  /**
   * A helper query that returns either a Marker ('X' or 'O') that is deemed to have won, or returns undefined if there is no current winner.
   * 
   * @returns a string Marker if there is a winner; undefined otherwise
   */
  findWinner(): Marker | undefined {
    const rowWins = [
      [[1, 1], [1, 2], [1, 3]],
      [[2, 1], [2, 2], [2, 3]],
      [[3, 1], [3, 2], [3, 3]]
    ]

    const colWins = [
      [[1, 1], [2, 1], [3, 1]],
      [[1, 2], [2, 2], [3, 2]],
      [[1, 3], [2, 3], [3, 3]]
    ]

    const winCombinations = [
      ...rowWins,
      ...colWins
    ]

    for (let coordArr of winCombinations) {
      const boardPositions = coordArr.map(([row, col]) => ({ row, col }))
      const xWins = this.allEqualTo('X', boardPositions)
      const oWins = this.allEqualTo('O', boardPositions)
      if (xWins) {
        return 'X'
      } else if (oWins) {
        return 'O'
      }
    }

    return undefined
  }

  /**
   * A helper query to return the turn number of the game.
   * 
   * @returns the number of markers that have been played
   */
  getTurnCount(): number {
    return this.board.reduce(
      (acc, row) => {
        const rowMarkerCount = row.filter(cell => ['X', 'O'].includes(cell))
        return acc + rowMarkerCount.length
      }
    , 0)
  }

  /**
   * A helper query to return the marker for the current turn player.
   * 
   * @returns a string representing the current turn player
   */
  getTurnPlayer(): Marker {
    const isEvenTurn = this.getTurnCount() % 2 === 0

    return isEvenTurn ? 'X' : 'O'
  }

  /**
   * A helper query to read the board at a given position.
   * 
   * @param param0 Board position to read from
   */
  readCell({ row, col }: BoardPosition): Cell {
    // subtract one as row and col are not zero-based
    return this.board[row - 1][col - 1]
  }

  /**
   * A helper query to return a given row in a stylised ASCII format
   * @param rowNo non-zero based row number
   * @returns string, ASCII representation of row
   */
  rowString(rowNo: number): string {
    return this.board[rowNo - 1].reduce((acc, val) => (acc + (val ? val : ' ') + '|'), '|')
  }

  /**
   * A helper command to write to a cell on the board.
   * 
   * @param param0 Board position to write at
   * @param marker Marker to write with
   */
  writeCell({ row, col }: BoardPosition, marker: Marker): void {
    this.board[row - 1][col - 1] = marker
  }
}

/**
 * Represents a given player.
 */
type Marker = 'X' | 'O'

/**
 * Represents a cell on the Tic Tac Toe board.
 *  The empty string represents an empty cell.
 *  A marker represents a player who has played there
 */
type Cell = '' | Marker

/**
 * Represents a row on the Tic Tac Toe board.
 */
type Row = [Cell, Cell, Cell]

/**
 * Represents the 3 x 3 Tic Tac Toe board.
 */
type Board = [Row, Row, Row]

/**
 * Represents non-zero based coordinates for
 *  a given board cell.
 */
interface BoardPosition {
  /** Non-zero based row number */
  row: number,

  /** Non-zero based column number */
  col: number
}

export default TicTacToe