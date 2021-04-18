import gameboardFactory from './gameboardFactory';

const playerFactory = (player2Type) => {
  const player1Board = gameboardFactory();
  const player2Board = gameboardFactory();
  
  const computerTakeTurn = (opBoard, prevMove, hitMove, movesMade) => {
    const columnObject = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let column = '';
    let row = '';

    if (prevMove[1].column === '') {
      const randomColumnIndex = Math.floor(Math.random() * 11);
      column = columnObject[randomColumnIndex];
      row = Math.floor(Math.random() *  10) + 1;
      let madeCheck = movesMade.filter((move) => {
        if (move === column + row) {
          return true;
        }
        return false;
      });
      while (madeCheck.length > 0) {
        column = columnObject[randomColumnIndex];
        row = Math.floor(Math.random() *  10) + 1;
        madeCheck = movesMade.filter((move) => {
          if (move === column + row) {
            return true;
          }
          return false;
        });
      }
    }

    if (prevMove[1].column !== '' && prevMove[1].hit === false) {
      // If there are no more possible hitMove tries, randomly generate a new attack
      if (hitMove.tries.length < 1) {
        const randomColumnIndex = Math.floor(Math.random() * 11);
        column = columnObject[randomColumnIndex];
        row = Math.floor(Math.random() *  10) + 1;
        let madeCheck = movesMade.filter((move) => {
          if (move === column + row) {
            return true;
          }
          return false;
        });
        while (madeCheck.length > 0) {
          column = columnObject[randomColumnIndex];
          row = Math.floor(Math.random() *  10) + 1;
          madeCheck = movesMade.filter((move) => {
            if (move === column + row) {
              return true;
            }
            return false;
          });
        }
        return;
      }
      // If there are remaining hitMove tries pick one randomly
      const min = 0;
      const max = hitMove.tries.length - 1;
      function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }
      column = hitMove.tries[randomNumber(min, max)].column;
      row = hitMove.tries[randomNumber(min, max)].row;
      console.log('hitMove random: ', column, row);
    }

    opBoard.receiveAttack(column, row);
    movesMade.push(column + row);
    let didHit = false;
    if (opBoard.squares[column][row].attackType !== null) {
      const shiftLeftCol = columnObject[columnObject.indexOf(column) - 1];
      const shiftRightCol = columnObject[columnObject.indexOf(column) + 1];
      const shiftDownRow = row + 1;
      const shiftUpRow = row - 1;
      let colChoiceArray = [
        shiftLeftCol, shiftRightCol,
      ];
      let rowChoiceArray = [
        shiftDownRow, shiftUpRow,
      ];
      
      colChoiceArray = colChoiceArray.filter((col) => {
        if (col !== undefined) {
          return true;
        }
        return false;
      });
      rowChoiceArray = rowChoiceArray.filter((row) => {
        if (row > 0 && row < 11) {
          return true;
        }
        return false;
      });
      console.log('choiceArray: ', colChoiceArray, rowChoiceArray);

      let tries = [];
      colChoiceArray.forEach((tryCol) => {
        if (movesMade.includes(tryCol + row)) {
          return;
        }
        tries.push({
          column: tryCol,
          row: row,
        });
      });

      rowChoiceArray.forEach((tryRow) => {
        if (movesMade.includes(column + tryRow)) {
          return;
        }
        tries.push({
          column: column,
          row: tryRow,
        });
      });
      
      
      didHit = true;
      hitMove = {
        column,
        row, 
        tries,
      }
    }
    
    // Updates the prevMoves
    if (prevMove[1].column === '') {
      prevMove[1] = {
        column,
        row,
        hit: didHit,
      }
      return;
    }

    prevMove[2] = {...prevMove[1]};
    prevMove[1] = {
      column,
      row,
      hit: didHit,
    }
  }
  
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