/**
 * Compare a string length with maximum length.
 * @param {string} str - The received string.
 * @param {number} maxLength - The maximum length.
 * @returns {boolean} True if string length is shorter or equal to the maximum length.
 */
function isShorterOrEqual(str, maxLength) {
  return str.length <= maxLength;
}

isShorterOrEqual('проверяемая строка', 10);
isShorterOrEqual('проверяемая строка', 20);
isShorterOrEqual('проверяемая строка', 18);

/**
 * Find a palindrome.
 * @param {string} phrase - The received string.
 * @returns {boolean} True if string is a palindrome.
 */
function isPalindrome(phrase) {
  const str = phrase.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < str.length / 2; i++) {
    if (str.at(i) !== str.at(- i - 1)) {
      return false;
    }
  }
  return true;
}

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

/**
 * Extract all positive integers from the string.
 * @param {string} str - The received string.
 * @returns {number} All positive integers from the string or NaN.
 */
function getNumberFromString(str) {
  if (typeof str === 'number') {
    return Math.abs(str);
  }
  let integersFromString = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str.at(i), 10))) {
      integersFromString += str.at(i);
    }
  }
  return parseInt(integersFromString, 10);
}

getNumberFromString('2023 год');
getNumberFromString('1 кефир и 0.5 булки');
getNumberFromString('ECMAScript 2022');
getNumberFromString('агент 007');
getNumberFromString('а я томат');
getNumberFromString(-1);

/**
  * Pad the start of an original string with an optional string to a certain length.
  * @param {string} str - The original string.
  * @param {number} minLength - The minimum length.
  * @param {string} addStr - The optional string.
  * @returns A string that has been padded at the start with the optional string to the desired length.
  */
function myPadStart(str, minLength, addStr) {
  while (str.length < minLength) {
    const newLength = str.length + addStr.length;
    const pad = (newLength <= minLength)
      ? addStr
      : addStr.slice(0, minLength - newLength);
    str = pad + str;
  }
  return str;
}

myPadStart('1', 4, '0');
myPadStart('q', 4, 'werty');
myPadStart('q', 4, 'we');
myPadStart('qwerty', 4, '0');
