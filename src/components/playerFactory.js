import gameboardFactory from './gameboardFactory';
import computerTakeTurn from './computerLogic';

const playerFactory = (player2Type) => {
  const player1Board = gameboardFactory();
  const player2Board = gameboardFactory();
  
  const player1 = {
    gameBoard: player1Board,
    opBoard: {},
    isTurn: false,
    type: 'player',
    movesMade: [],
    hitMove: {
      column: '',
      row: '',
      tries: [],
    },
    prevMove: {
      1: {
        column: '',
        row: '',
        hit: false,
      },
      2: {
        column: '',
        row: '',
        hit: false,
      },
    },
    takeTurn(column, row) {
      this.opBoard.receiveAttack(column, row);
      const attackType = this.opBoard.squares[column][row].attackType;
      if (this.prevMove[1].column === '') {
        this.prevMove[1] = {
          column,
          row,
          hit: attackType,
        }
        return;
      }
      this.prevMove[2] = {...this.prevMove[1]};
      this.prevMove[1] = {
        column,
        row,
        hit: attackType,
      }
    },
  };

  let player2 = {
    gameBoard: player2Board,
    opBoard: {},
    isTurn: false,
    type: 'computer',
    movesMade: [],
    hitMove: {
      column: '',
      row: '',
      tries: [],
    },
    prevMove: {
      1: {
        column: '',
        row: '',
        hit: false,
      },
      2: {
        column: '',
        row: '',
        hit: false,
      },
    },
    takeTurn(column, row) {
      if (this.type === 'player') {
        this.opBoard.receiveAttack(column, row);
        const attackType = this.opBoard.squares[column][row].attackType;
        this.prevMove = {
          column,
          row,
          hit: attackType,
        }
        return;
      }
      computerTakeTurn(this.opBoard, this.prevMove, this.hitMove, this.movesMade);
    },
  };
  
  if (player2Type === 'player') {
    player2.type = 'player';
  };

  player1.opBoard = player2.gameBoard;
  player2.opBoard = player1.gameBoard;
  
  const allPlayers = {
    player1,
    player2,
  };

  return allPlayers;
}

export default playerFactory