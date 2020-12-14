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

export default ConnectFour;
