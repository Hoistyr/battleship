import gameboardFactory from '../components/gameboardFactory';

test('gameBoard should be an object', () => {
  const gameBoard = gameboardFactory();
  expect(typeof(gameBoard)).toBe('object');
});

test('gameBoard should have rows and columns which store data', () => {
  const gameBoard = gameboardFactory();
  expect(gameBoard.squares.a[1]).toEqual({"attacked": false, "hasShip": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.e[5]).toEqual({"attacked": false, "hasShip": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.j[10]).toEqual({"attacked": false, "hasShip": false, "ship": null, "shipPart": ""}
  );
  
});

test('gameBoard placeShip should put the ship in the right place: Dir: Right', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'right', 5);
  expect(gameBoard.squares.a[1].hasShip).toBe(true);
  expect(gameBoard.squares.c[1].shipPart).toBe(3);
});

//TODO Implement the tests for the other directions
test('gameBoard placeShip should put the ship in the right place: Dir: Left', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('j', 1, 'left', 5);
  expect(gameBoard.squares.j[1].hasShip).toBe(true);
  expect(gameBoard.squares.h[1].shipPart).toBe(3);
});