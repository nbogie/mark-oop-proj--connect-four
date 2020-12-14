/**
 * The public interface for the Connect Four game.
 */
interface IConnectFour {
  /**
   * Drops a counter in the given column number (non-zero based).
   *
   * @param columnNumber the non-zero based column number where a counter should be dropped
   */
  dropCounter(columnNumber: number): void;

  /**
   * A query to read the current state of the Connect Four board.
   */
  getBoard(): Board;

  /**
   * A helper query to describe the status of the game: whether it's complete (`isComplete`), who needs to play (`turnPlayer`) and who is the winner if there is one (`winner`)
   */
  getStatus(): GameStatus;

  /**
   * Output the board state to console.
   */
  printBoard(): void;
  /**
   * A command to load a given Connect 4 board
   * 
   * @param board a game board to load
   */
  loadBoard(board: Board): void;
}

class ConnectFour implements IConnectFour {
  /**
   * Write your code below!
   */
  board: Board;
  constructor() {
    this.board = ConnectFour.createBoard();
  }
  getNumRows(): number {
    return this.board.length;
  }
  getNumCols(): number {
    return this.board[0].length;
  }

  getBoard(): Board {
    return this.board;
  }
  printBoard(): void {
    function toPrintChar(cell: Cell) {
      return cell === "" ? " " : cell;
    }
    const lines = [];

    for (let cells of this.board) {
      lines.push("|" + cells.map(toPrintChar).join("|") + "|");
    }
    console.log(lines.join("\n"));
  }

  dropCounter(columnNumber: number): void {
    if (columnNumber < 1 || columnNumber > this.getNumCols()) {
      console.log(`You can't place a counter in column ${columnNumber} - that's not a valid column in our board! Why don't you try somewhere else?`)
    } else {

      let finalPlace = null;
      for (let rowNumber = this.getNumRows(); rowNumber >= 1; rowNumber--) {
        const cell = this.readCell(rowNumber, columnNumber);
        if (ConnectFour.isCellEmpty(cell)) {
          finalPlace = { row: rowNumber, col: columnNumber };
          break;
        }
      }
      if (finalPlace) {
        const marker = this.turnPlayerIgnoringWinOrDraw();
        this.setCell(finalPlace.row, finalPlace.col, marker);
      } else {
        console.log(`You can't place a counter in column ${columnNumber} - it is full! Why don't you try somewhere else?`);
      }
    }
  }
  findWinner(): Marker | undefined {
    const cellMatchesX = (pos) => cellMatches("X", pos);
    const cellMatchesO = (pos) => cellMatches("O", pos);
    const cellMatches = (marker: Marker, [rowNum, colNum]) => this.readCell(rowNum, colNum) === marker;

    const horizWinLines = collectFromTo(1, 6,
      (rowNum) => collectFromTo(1, 4,
        (startColNum) => collectFromTo(startColNum, startColNum + 3,
          (colNum) => [rowNum, colNum]))).flat()

    const vertWinLines = collectFromTo(1, 7,
      (colNum) => collectFromTo(1, 3,
        (startRowNum) => collectFromTo(startRowNum, startRowNum + 3,
          (rowNum) => [rowNum, colNum]))).flat()

    // these diagonals /
    const slashWinLines = collectFromTo(4, 6, startRowNum => collectFromTo(1, 4, startColNum => collectFromTo(0, 3, (offset => [startRowNum - offset, startColNum + offset])))).flat()

    // these diagonals \
    const backslashWinLines = collectFromTo(1, 3, startRowNum => collectFromTo(1, 4, startColNum => collectFromTo(0, 3, (offset => [startRowNum + offset, startColNum + offset])))).flat()

    const allPossibleWinLines = [...horizWinLines, ...vertWinLines, ...slashWinLines, ...backslashWinLines];

    //TODO: rewrite so we don't need two separate check fns
    const foundWinLines: number[][] = allPossibleWinLines.find(posns => posns.every(cellMatchesX) || posns.every(cellMatchesO))

    if (!foundWinLines) {
      return undefined;
    }
    //TODO: horrors. try writing so that the typechecker *knows* we have a tuple, and then a marker!  Don't use `as`.
    return this.readCell(...foundWinLines[0] as [number, number]) as Marker;
  }

  getStatus(): GameStatus {
    const winner = this.findWinner();
    const isDraw = !winner && (this.turnCount() >= this.getNumRows() * this.getNumCols());
    const isComplete = (winner !== undefined) || isDraw;

    if (winner) {
      return { isComplete, winner };
    } else if (isComplete) {
      return { isComplete } //include isDraw later
    } else {
      return {
        isComplete: false,
        turnPlayer: this.turnPlayerIgnoringWinOrDraw()
      }
    }
  }

  loadBoard(board: Board): void {
    this.board = board;
  }

  turnCount(): number {
    const flattened = this.board.flat();
    return flattened.filter(cell => !ConnectFour.isCellEmpty(cell)).length
  }

  turnPlayerIgnoringWinOrDraw(): Marker {
    return (this.turnCount() % 2 === 0) ? "X" : "O";
  }

  //Row 1 is the top row. col 1 is the left-most column
  readCell(rowNum: number, colNum: number): Cell {
    return this.board[rowNum - 1][colNum - 1];
  }

  setCell(rowNum: number, colNum: number, marker: Marker): void {
    if (ConnectFour.isCellEmpty(this.readCell(rowNum, colNum))) {
      this.board[rowNum - 1][colNum - 1] = marker;
    } else {
      console.error(`There is already a marker in row ${rowNum}, col: ${colNum}`);
    }
  }

  static createEmptyCell(): Cell {
    return '';
  }

  static createBoard(): Board {
    const numRows = 6;
    const numCols = 7;
    const tempBoard = [];
    for (let i = 0; i < numRows; i++) {
      const row = Array(numCols).fill(ConnectFour.createEmptyCell());
      tempBoard.push(row);
    }
    return tempBoard as Board; //TODO: remove all uses of as.
  }
  static isCellEmpty(Cell): boolean {
    return Cell === "";
  }


}


/**
 * Represents a given player.
 */
type Marker = "X" | "O";

/**
 * Represents a cell on the Connect Four board.
 *  The empty string represents an empty cell.
 *  A marker represents a player who has played there.
 */
type Cell = "" | Marker;

/**
 * Represents a row on the Connect Four board.
 */
type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell];

/**
 * Represents the 7 x 6 Connect Four board.
 * row 1 is the top row.
 */
type Board = [Row, Row, Row, Row, Row, Row];

type GameStatus = {
  /** Whether or not the game has finished */
  isComplete: boolean;

  /** The player whose turn it is to play (if there is one) */
  turnPlayer?: Marker;

  /** The player who has won the game (if there is a winner) */
  winner?: Marker;
};


function collectFromTo<T>(from: number, to: number, fn: (ix: number) => T): T[] {
  const arr = [];
  for (let ix = from; ix <= to; ix++) {
    arr.push(fn(ix));
  }
  return arr;
}

export default ConnectFour;
