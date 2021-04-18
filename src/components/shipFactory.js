const shipFactory = (length) => {
  let hitLocations = {};
  for (let i = 1; i <= length; i++) {
    hitLocations[i] = 'notHit';
  }

  const ship = {
    length: length || '',
    hitLocations,
     

    hit(number) {
      if (typeof(number) !== 'number') {
        return;
      }
      this.hitLocations[number] = 'hit';
    },

    isSunk() {
      if (!Object.values(this.hitLocations).includes('notHit')) {
        return true;
      }
      return false;
    },
  }

  return ship;
};

export default shipFactory;