import gameboardFactory from '../components/gameboardFactory';

test('gameBoard should be an object', () => {
  const gameBoard = gameboardFactory();
  expect(typeof(gameBoard)).toBe('object');
});

test('gameBoard should have rows and columns which store data', () => {
  const gameBoard = gameboardFactory();
  expect(gameBoard.squares.a[1]).toEqual({"attackType": null, "hasShip": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.e[5]).toEqual({"attackType": null, "hasShip": false, "ship": null, "shipPart": ""}
  );
  expect(gameBoard.squares.j[10]).toEqual({"attackType": null, "hasShip": false, "ship": null, "shipPart": ""}
  );
  
});

// Testing placeShip

test('gameBoard placeShip should put the ship in the right place: Dir: Right', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'right', 5);
  expect(gameBoard.squares.a[1].hasShip).toBe(true);
  expect(gameBoard.squares.c[1].shipPart).toBe(3);
});

test('gameBoard placeShip should put the ship in the right place: Dir: Left', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('j', 1, 'left', 5);
  expect(gameBoard.squares.j[1].hasShip).toBe(true);
  expect(gameBoard.squares.h[1].shipPart).toBe(3);
  expect(gameBoard.squares.f[1].shipPart).toBe(5);
  expect(gameBoard.squares.e[1].shipPart).toBe('');
});

test('gameBoard placeShip should put the ship in the right place: Dir: Up', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('j', 10, 'up', 5);
  expect(gameBoard.squares.j[10].hasShip).toBe(true);
  expect(gameBoard.squares.j[9].shipPart).toBe(2);
  expect(gameBoard.squares.j[7].shipPart).toBe(4);
  expect(gameBoard.squares.e[1].shipPart).toBe('');
});

test('gameBoard placeShip should put the ship in the right place: Dir: Down', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('e', 3, 'down', 5);
  expect(gameBoard.squares.e[3].hasShip).toBe(true);
  expect(gameBoard.squares.e[4].shipPart).toBe(2);
  expect(gameBoard.squares.e[6].shipPart).toBe(4);
  expect(gameBoard.squares.j[1].shipPart).toBe('');
});

//Testing receiveAttack

test('receiveAttack should detect if a ship is on a square', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.receiveAttack('b', 1);
  expect(gameBoard.squares.b[1].ship).toBe(null);
  expect(gameBoard.squares.b[1].attackType).toBe('miss');
  expect(gameBoard.squares.a[1].attackType).toBe(null);
});

test('receiveAttack should attack the ship on a square', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.receiveAttack('a', 1);
  expect(gameBoard.squares.a[1].ship.hitLocations[1]).toBe('hit');
  expect(gameBoard.squares.a[5].ship.hitLocations[2]).toBe('notHit');
  expect(gameBoard.squares.b[1].attackType).toBe(null);
  expect(gameBoard.squares.a[1].attackType).toBe('hit');
});

test('receiveAttack should be able to sink a ship', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.receiveAttack('a', 1);
  gameBoard.receiveAttack('a', 2);
  gameBoard.receiveAttack('a', 3);
  gameBoard.receiveAttack('a', 4);
  gameBoard.receiveAttack('a', 5);
  expect(gameBoard.squares.a[1].ship.hitLocations[1]).toBe('hit');
  expect(gameBoard.squares.a[5].ship.hitLocations[5]).toBe('hit');
  expect(gameBoard.squares.b[1].attackType).toBe(null);
  expect(gameBoard.squares.a[1].attackType).toBe('hit');
  expect(gameBoard.squares.a[1].ship.isSunk()).toBe(true);
});

// Testing if all the ships are sunk
test('receiveAttack should be able to sink a ship', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.receiveAttack('a', 1);
  gameBoard.receiveAttack('a', 2);
  gameBoard.receiveAttack('a', 3);
  gameBoard.receiveAttack('a', 4);
  gameBoard.receiveAttack('a', 5);
  expect(gameBoard.allSunk()).toBe(true);
});

test('receiveAttack should be able to sink a ship', () => {
  const gameBoard = gameboardFactory();
  gameBoard.placeShip('a', 1, 'down', 5);
  gameBoard.placeShip('b', 1, 'down', 5);
  gameBoard.receiveAttack('a', 1);
  gameBoard.receiveAttack('a', 2);
  gameBoard.receiveAttack('a', 3);
  gameBoard.receiveAttack('a', 4);
  gameBoard.receiveAttack('a', 5);
  expect(gameBoard.squares.a[1].ship.isSunk()).toBe(true);
  expect(gameBoard.allSunk()).toBe(false);
});