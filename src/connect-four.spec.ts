import ConnectFour from "./connect-four"

describe('Core ConnectFour tests', () => {
  describe('Initialising', () => {
    const game = new ConnectFour()

    it('Creates an empty board', () => {
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
      ])
    })

    it("Reports the game status correctly", () => {
      expect(game.getStatus()).toEqual({
        isComplete: false,
        turnPlayer: 'X'
      })
    })

    it("Can load a given board", () => {
      game.loadBoard([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', 'X', '', '', ''],
        ['', '', 'O', 'X', '', '', ''],
        ['', '', 'X', 'O', '', '', '']
      ])
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', 'X', '', '', ''],
        ['', '', 'O', 'X', '', '', ''],
        ['', '', 'X', 'O', '', '', '']
      ])

      expect(game.getStatus()).toBe({
        isComplete: false,
        turnPlayer: 'O'
      })
    })
  })

  describe('Playing', () => {
    const game = new ConnectFour()
    
    it('Can drop counters in given rows', () => {
      game.dropCounter(2)
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', 'X', '', '', '', '', '']
      ])
    })

    it("Plays an O on the second marker placed", () => {
      game.dropCounter(2)
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', 'O', '', '', '', '', ''],
        ['', 'X', '', '', '', '', '']
      ])
    })

    it('Logs out a message when an occupied cell is attempted', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      game.dropCounter(2)
      game.dropCounter(2)
      game.dropCounter(2)
      game.dropCounter(2)
      expect(game.getBoard()).toEqual([
        ['', 'O', '', '', '', '', ''],
        ['', 'X', '', '', '', '', ''],
        ['', 'O', '', '', '', '', ''],
        ['', 'X', '', '', '', '', ''],
        ['', 'O', '', '', '', '', ''],
        ['', 'X', '', '', '', '', '']
      ])
      expect(consoleSpy).not.toHaveBeenCalledWith("You can't place a counter in column 2 - it is full! Why don't you try somewhere else?")
      game.dropCounter(2)
      expect(consoleSpy).toHaveBeenCalledWith("You can't place a counter in column 2 - it is full! Why don't you try somewhere else?")
    })

    it('Logs out a message when an invalid column is provided', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      game.dropCounter(10)
      expect(consoleSpy).toHaveBeenCalledWith("You can't place a counter in column 10 - that's not a valid column in our board! Why don't you try somewhere else?")
    })

    it('Prints a visual board', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      game.printBoard()
      expect(consoleSpy).toHaveBeenCalledWith("| |O| | | | | |\n| |X| | | | | |\n| |O| | | | | |\n| |X| | | | | |\n| |O| | | | | |\n| |X| | | | | |")
    })
  })

  describe('Game end', () => {
    it('Detects a first row win', () => {
      const game = new ConnectFour()
      game.dropCounter(2)
      game.dropCounter(2)
      game.dropCounter(3)
      game.dropCounter(3)
      game.dropCounter(4)
      game.dropCounter(4)
      game.dropCounter(5)
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', 'O', 'O', 'O', '', '', ''],
        ['', 'X', 'X', 'X', 'X', '', '']
      ])
      expect(game.getStatus()).toEqual({
        isComplete: true,
        winner: 'X'
      })
    })

    it('Detects a fourth column win', () => {
      const game = new ConnectFour()
      game.dropCounter(2)
      game.dropCounter(4)
      game.dropCounter(3)
      game.dropCounter(4)
      game.dropCounter(3)
      game.dropCounter(4)
      game.dropCounter(3)
      game.dropCounter(4)
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', 'O', '', '', ''],
        ['', '', 'X', 'O', '', '', ''],
        ['', '', 'X', 'O', '', '', ''],
        ['', 'X', 'X', 'O', '', '', '']
      ])
      expect(game.getStatus()).toEqual({
        isComplete: true,
        winner: 'O'
      })
    })

    it('Detects a diagonal win', () => {
      const game = new ConnectFour()
      game.dropCounter(2)
      game.dropCounter(3)
      game.dropCounter(3)
      game.dropCounter(4)
      game.dropCounter(5)
      game.dropCounter(4)
      game.dropCounter(4)
      game.dropCounter(5)
      game.dropCounter(3)
      game.dropCounter(5)
      game.dropCounter(5)
      expect(game.getBoard()).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', 'X', '', ''],
        ['', '', 'X', 'X', 'O', '', ''],
        ['', '', 'X', 'O', 'O', '', ''],
        ['', 'X', 'O', 'O', 'X', '', '']
      ])
      expect(game.getStatus()).toEqual({
        isComplete: true,
        winner: 'X'
      })
    })

    it('Announces no winner or turn player in a draw', () => {
      const game = new ConnectFour()
      game.loadBoard([
        ['O', 'O', 'X', 'X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'O', 'X', 'X', 'O'],
        ['O', 'O', 'X', 'X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'O', 'X', 'X', 'O'],
        ['O', 'O', 'X', 'X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'O', 'X', 'X', 'O']
      ])
      expect(game.getStatus()).toEqual({
        isComplete: true
      })
    })
  })
})