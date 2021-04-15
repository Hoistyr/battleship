import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const columnObject = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const rowDetails = {
    hasShip: false,
    ship: null,
    shipPart: '',
    attacked: false,
  }
  const rowObject = {
    1: {...rowDetails},
    2: {...rowDetails},
    3: {...rowDetails},
    4: {...rowDetails},
    5: {...rowDetails},
    6: {...rowDetails},
    7: {...rowDetails},
    8: {...rowDetails},
    9: {...rowDetails},
    10: {...rowDetails},
  };

  const gameBoard = {
    squares: {
      a: {...rowObject},
      b: {...rowObject},
      c: {...rowObject},
      d: {...rowObject},
      e: {...rowObject},
      f: {...rowObject},
      g: {...rowObject},
      h: {...rowObject},
      i: {...rowObject},
      j: {...rowObject},
    },
   
    placeShip(startingColumn, startingRow, direction, length) {
      const ship = shipFactory(length);
      const squaresWithNewShip = {...this.squares};
      for (let i = 1; i <= length; i++) {
        if (i === 1) {
          squaresWithNewShip[startingColumn][startingRow] = {
            hasShip: true,
            ship: ship,
            shipPart: i,
            attacked: false,
          };
        }

        if (direction === 'right' && i !== 1) {
          const nextColumn = columnObject[columnObject.indexOf(startingColumn) + i - 1];
          squaresWithNewShip[nextColumn][startingRow] = {
            hasShip: true,
            ship: ship,
            shipPart: i,
            attacked: false,
          };
        }

        if (direction === 'left' && i !== 1) {
          const nextColumn = columnObject[columnObject.indexOf(startingColumn) - i - 1];
          squaresWithNewShip[nextColumn][startingRow] = {
            hasShip: true,
            ship: ship,
            shipPart: i,
            attacked: false,
          };
        }
      }
      this.squares = squaresWithNewShip;
    },
    receiveAttack(column, row) {
      const squaresWithAttack = {...this.squares};
      if (squaresWithAttack[column[row]].ship === null) {
        squaresWithAttack[column[row]].attacked = true;
      }
      // squaresWithAttack[column[row]]
    },
  }

  return gameBoard;
};

export default gameboardFactory;