const computerTakeTurn = (opBoard, prevMove, hitMove, movesMade) => {
  const columnObject = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let column = '';
  let row = '';

  // If the computer hasn't made a move before randomly select a square
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
    
    // Randomly picks a try until one which hasn't been made is found
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

  // If there is a previous move, but it wasn't a hit randomly select a new move
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

      // Randomly picks a try until one which hasn't been made is found
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

    // If there are remaining hitMove tries, pick one randomly
    const min = 0;
    const max = hitMove.tries.length - 1;
    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
    column = hitMove.tries[randomNumber(min, max)].column;
    row = hitMove.tries[randomNumber(min, max)].row;
    console.log('hitMove random: ', column, row);
  }

  // Sends the attack to the opponents board
  opBoard.receiveAttack(column, row);
  movesMade.push(column + row);
  let didHit = false;
  if (opBoard.squares[column][row].attackType !== null) {

    // Generates a list of possible squares to attack if the attack is a hit
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
    
    // Filters out choices that are not on the board
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
      console.log(colChoiceArray);
      // Doesn't add moves already made to the possible tries
      if (movesMade.includes(tryCol + row)) {
        return;
      }
      tries.push({
        column: tryCol,
        row: row,
      });
    });

    rowChoiceArray.forEach((tryRow) => {
      // Doesn't add moves already made to the possible tries
      if (movesMade.includes(column + tryRow)) {
        return;
      }
      tries.push({
        column: column,
        row: tryRow,
      });
    });

    console.log('tries: ', tries);
    
    
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

export default computerTakeTurn;