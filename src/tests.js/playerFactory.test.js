import playerFactory from '../components/playerFactory';

test('player1 should exist', () => {
  const allPlayers = playerFactory(); 
  expect(allPlayers.player1 !== null).toBe(true);
});

test('player2 should exist', () => {
  const allPlayers = playerFactory(); 
  expect(allPlayers.player2 !== null).toBe(true);
});

test('player2 should be set to computer by default', () => {
  const allPlayers = playerFactory(); 
  expect(allPlayers.player2.type).toBe('computer');
});

test('player2 should be able to have a player type', () => {
  const allPlayers = playerFactory('player'); 
  expect(allPlayers.player2.type).toBe('player');
});

test('player boards should be able to place ships', () => {
  const allPlayers = playerFactory('player');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  expect(allPlayers.player1.gameBoard.squares.a[1].hasShip).toBe(true);
  expect(allPlayers.player1.gameBoard.squares.a[3].shipPart).toBe(3);
});

test('player opponent boards should be the same', () => {
  const allPlayers = playerFactory('player');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  
  expect(allPlayers.player2.opBoard.squares.a[1].hasShip).toBe(true);
  expect(allPlayers.player2.opBoard.squares.a[3].shipPart).toBe(3);
});

test('player boards should be separate', () => {
  const allPlayers = playerFactory('player');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);
  
  expect(allPlayers.player1.gameBoard.squares.a[1].hasShip).toBe(true);
  expect(allPlayers.player2.gameBoard.squares.a[1].hasShip).toBe(false);
  expect(allPlayers.player1.gameBoard.squares.b[1].hasShip).toBe(false);
  expect(allPlayers.player2.gameBoard.squares.b[1].hasShip).toBe(true);
});

test('player attacks should alter opponent boards', () => {
  const allPlayers = playerFactory('player');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);
  
  allPlayers.player1.takeTurn('b', 1);
  expect(allPlayers.player2.gameBoard.squares.b[1].ship.hitLocations[1]).toBe('hit');

  allPlayers.player2.takeTurn('a', 1);
  expect(allPlayers.player1.gameBoard.squares.a[1].ship.hitLocations[1]).toBe('hit');
});

test('computer attack should update its previous move object', () => {
  const allPlayers = playerFactory('computer');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);

  allPlayers.player2.takeTurn();
  const prevMove = allPlayers.player2.prevMove[1];
  expect(allPlayers.player2.prevMove[1].column !== '').toBe(true);
});

test('computer should randomly attack if it does not have a previous move', () => {
  const allPlayers = playerFactory('computer');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);

  allPlayers.player2.takeTurn();
  const prevMove = allPlayers.player2.prevMove[1];
  expect(allPlayers.player1.gameBoard.squares[prevMove.column][prevMove.row].attackType === null).toBe(false);
});

test('computer movesMade updates', () => {
  const allPlayers = playerFactory('computer');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);

  allPlayers.player2.takeTurn();
  const prevMove = allPlayers.player2.prevMove[1];
  expect(allPlayers.player2.movesMade.length > 0).toBe(true);
});

test('computer should randomly attack if it does not have a previous move', () => {
  const allPlayers = playerFactory('computer');
  allPlayers.player1.gameBoard.placeShip('a', 1, 'down', 3);
  allPlayers.player2.gameBoard.placeShip('b', 1, 'down', 3);

  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  allPlayers.player2.takeTurn();
  expect(allPlayers.player1).toBe(true);
});