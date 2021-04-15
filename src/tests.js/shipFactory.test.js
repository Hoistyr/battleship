import shipFactory from '../components/shipFactory';

test('setting the length to five should return a ship with a length of five', () => {
  expect(shipFactory(5).length).toBe(5);
  expect(shipFactory(2).length).toBe(2);
});

test('setting the length to five should return a ship 5 empty hit locations', () => {
  expect(shipFactory(5).hitLocations).toEqual({ 1: "notHit", 2: "notHit", 3: "notHit", 4: "notHit", 5: "notHit" });
});

test('hitting a spot on a ship should change the hitLocation from notHit to hit', () => {
  const testShip = shipFactory(2);
  testShip.hit(2);
  expect(testShip.hitLocations).toEqual({ 1: "notHit", 2: "hit"});
});

test('hit should only accept numbers', () => {
  const testShip = shipFactory(2);
  testShip.hit('bears');
  expect(testShip.hitLocations).toEqual({ 1: "notHit", 2: "notHit"});
});

test('ships should not be sunk by default', () => {
  const testShip = shipFactory(2);
  testShip.isSunk();
  expect(testShip.sunk).toEqual(false);
});

test('ships should be sinkable', () => {
  const testShip = shipFactory(2);
  testShip.hit(1);
  testShip.hit(2);
  testShip.isSunk();
  expect(testShip.sunk).toEqual(true);
});