import gameboardFactory from '../components/gameboardFactory';

test('gameBoard should be an object', () => {
  const gameBoard = gameboardFactory();
  expect(typeof(gameBoard)).toBe('object');
});

test('gameBoard should have rows and columns which store data', () => {
  const gameBoard = gameboardFactory();
  expect(gameBoard.squares.a[1]).toEqual({"attacked": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.e[5]).toEqual({"attacked": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.j[10]).toEqual({"attacked": false, "ship": null, "shipPart": ""}
  );
  
});

test('gameBoard placeShip should put the ship in the right place', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'right', 5);
  expect(gameBoard.squares.a[3].shipPart).toBe(3);
});