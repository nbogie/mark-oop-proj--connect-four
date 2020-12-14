import TicTacToe from "./tic-tac-toe"

describe('Core TicTacToe tests', () => {
  describe('Initialising', () => {
    const game = new TicTacToe()

    it('Creates an empty board', () => {
      expect(game.getBoard()).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ])
    })

    it('Starts with X as the turn player', () => {
      expect(game.getTurnPlayer()).toBe('X')
    })

    it("Reports the game status as ongoing", () => {
      expect(game.getStatus()).toBe("Ongoing - X's turn")
    })
  })

  describe('Playing', () => {
    const game = new TicTacToe()
    
    it('Can add markers as specified', () => {
      game.addMarker({ row: 2, col: 2 })
      expect(game.getBoard()).toEqual([
        ['', '', ''],
        ['', 'X', ''],
        ['', '', '']
      ])
    })

    it('Logs out a message when an occupied cell is attempted', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      game.addMarker({ row: 2, col: 2 })
      expect(consoleSpy).toHaveBeenCalledWith("There's already a marker there - try placing somewhere else!");
    })

    it("Plays an O on the second marker placed", () => {
      game.addMarker({ row: 3, col: 3 })
      expect(game.getBoard()).toEqual([
        ['', '', ''],
        ['', 'X', ''],
        ['', '', 'O']
      ])
    })

    it.skip('Prints a visual board', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      game.printBoard()
      expect(consoleSpy).toHaveBeenCalledWith("| | | |\n| |X| |\n| | |O|")
    })
  })

  describe('Victory', () => {
    it('Detects a first row win', () => {
      const game = new TicTacToe()
      game.addMarker({ row: 2, col: 2 })
      game.addMarker({ row: 1, col: 1 })
      game.addMarker({ row: 3, col: 1 })
      game.addMarker({ row: 1, col: 2 })
      game.addMarker({ row: 3, col: 3 })
      game.addMarker({ row: 1, col: 3 })
      expect(game.getBoard()).toEqual([
        ['O', 'O', 'O'],
        ['', 'X', ''],
        ['X', '', 'X']
      ])
      expect(game.getStatus()).toBe('Finished - O is the winner!')
    })

    // TODO: fix code so this test passes
    it.skip('Detects a diagonal win', () => {
      const game = new TicTacToe()
      game.addMarker({ row: 2, col: 2 })
      game.addMarker({ row: 1, col: 3 })
      game.addMarker({ row: 3, col: 3 })
      game.addMarker({ row: 1, col: 2 })
      game.addMarker({ row: 1, col: 1 })
      expect(game.getBoard()).toEqual([
        ['X', 'O', 'O'],
        ['', 'X', ''],
        ['', '', 'X']
      ])
      expect(game.getStatus()).toBe('Finished - X is the winner!')
    })

  })
})