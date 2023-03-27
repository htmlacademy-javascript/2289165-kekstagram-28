/**
 * Getting a random integer in a given interval inclusive.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 */
function getRandomInteger(min, max) {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}

/**
 *Get random array index
 */
function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

/**
 * Keeping previous values and getting an unigue random integer in a given interval inclusive.
 */
function createRandomUniqueIntegerFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return undefined;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export {getRandomInteger, getRandomArrayElement, createRandomUniqueIntegerFromRangeGenerator};
