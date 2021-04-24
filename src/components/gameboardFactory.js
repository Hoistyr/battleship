import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const columnObject = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const rowDetails = {
    hasShip: false,
    ship: null,
    shipPart: '',
    attackType: null,
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

    shipList: [],
   
    placeShip(startingColumn, startingRow, direction, length) {
      const ship = shipFactory(length);
      this.shipList.push(ship);
      const squaresWithNewShip = {...this.squares};
      const addShip = (ship, i) => {
        return {
          hasShip: true, 
          ship: ship, 
          shipPart: i, 
          attackType: null,
        }
      };
  
      for (let i = 1; i <= length; i++) {
        if (i === 1) {
          squaresWithNewShip[startingColumn][startingRow] = addShip(ship, i);
        }

        if (direction === 'right' && i !== 1) {
          const nextColumn = columnObject[columnObject.indexOf(startingColumn) + i - 1];
          squaresWithNewShip[nextColumn][startingRow] = addShip(ship, i);
        }

        if (direction === 'left' && i !== 1) {
          const nextColumn = columnObject[columnObject.indexOf(startingColumn) - i + 1];
          squaresWithNewShip[nextColumn][startingRow] = addShip(ship, i);
        }

        if (direction === 'up' && i !== 1) {
          squaresWithNewShip[startingColumn][startingRow - i + 1] = addShip(ship, i);
        }

        if (direction === 'down' && i !== 1) {
          squaresWithNewShip[startingColumn][startingRow + i - 1] = addShip(ship, i);
        }
      }
      this.squares = squaresWithNewShip;
    },
    receiveAttack(column, row) {
      const squaresWithAttack = {...this.squares};
      if (squaresWithAttack[column][row].ship === null) {
        squaresWithAttack[column][row].attackType = 'miss';
        return;
      }
      
      const shipPart = squaresWithAttack[column][row].shipPart;
      squaresWithAttack[column][row].ship.hit(shipPart);
      squaresWithAttack[column][row].attackType = 'hit';
    },
    
    allSunk() {
      const unsunkShips = this.shipList.filter((ship) => {
        if (ship.isSunk() === false) {
          return true;
        }
        return false;
      });

      if (unsunkShips.length > 0) {
        return false;
      }
      return true;
    }
  }

  return gameBoard;
};

export default gameboardFactory;