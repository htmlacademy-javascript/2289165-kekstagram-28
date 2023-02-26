/* 1 Функция для проверки длины строки. Она принимает строку, которую
 нужно проверить, и максимальную длину и возвращает true, если строка
 меньше или равна указанной длине, и false, если строка длиннее. */

function isShorterOrEqual(phrase, maxLength) {
  return phrase.length <= maxLength;
}

console.log('1.1) false: ' + isShorterOrEqual('проверяемая строка', 10));
console.log('1.2) true: ' + isShorterOrEqual('проверяемая строка', 20));
console.log('1.3) true: ' + isShorterOrEqual('проверяемая строка', 18));

// 2 Функция для проверки, является ли строка палиндромом.

function isPalindrome(phrase) {
  const str = phrase.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < str.length / 2; i++) {
    if (str.at(i) !== str.at(- i - 1)) {
      return false;
    }
  }
  return true;
}

console.log('2.1) true: ' + isPalindrome('Лёша на полке клопа нашёл '));
console.log('2.2) true: ' + isPalindrome('топот'));
console.log('2.3) true: ' + isPalindrome('ДовОд'));
console.log('2.4) false: ' + isPalindrome('Кекс'));

/* 3 Функция, которая принимает строку, извлекает содержащиеся в ней
 цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 Если в строке нет ни одной цифры, функция должна вернуть NaN. */

function getNumberFromString(str) {
  if (typeof str === 'number') {
    return Math.abs(str);
  }
  let numbers = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str.at(i), 10))) {
      numbers += str.at(i);
    }
  }
  return parseInt(numbers, 10);
}

console.log('3.1) 2023: ' + getNumberFromString('2023 год'));
console.log('3.2) 105: ' + getNumberFromString('1 кефир и 0.5 булки'));
console.log('3.3) 2022: ' + getNumberFromString('ECMAScript 2022'));
console.log('3.4) 7: ' + getNumberFromString('агент 007'));
console.log('3.5) NaN: ' + getNumberFromString('а я томат'));
console.log('3.6) 1: ' + getNumberFromString(-1));

/* 4 Функция, которая принимает три параметра: исходную строку, минимальную
  длину и строку с добавочными символами — и возвращает исходную строку,
  дополненную указанными символами до заданной длины. Символы добавляются в
  начало строки. Если исходная строка превышает заданную длину, она не должна
  обрезаться. Если «добивка» слишком длинная, она обрезается с конца. */

function addSymbols(str, minLength, addStr) {
  while (str.length < minLength) {
    const newStr = str.length + addStr.length;
    const adding = (newStr <= minLength)
      ? addStr
      : addStr.slice(0, minLength - newStr);
    str = adding + str;
  }
  return str;
}

console.log('4.1) 0001: ' + addSymbols('1', 4, '0'));
console.log('4.2) werq: ' + addSymbols('q', 4, 'werty'));
console.log('4.3) wweq: ' + addSymbols('q', 4, 'we'));
console.log('4.4) qwerty: ' + addSymbols('qwerty', 4, '0'));
