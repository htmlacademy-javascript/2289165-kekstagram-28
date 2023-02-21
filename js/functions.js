/* 1 Функция для проверки длины строки. Она принимает строку, которую
 нужно проверить, и максимальную длину и возвращает true, если строка
 меньше или равна указанной длине, и false, если строка длиннее. */

function checkLength (phrase, maxLength) {
  return phrase.length <= maxLength;
}

checkLength('проверяемая строка', 10);


// 2 Функция для проверки, является ли строка палиндромом.

function findPalindrome (phrase) {
  const str = phrase.replaceAll(' ','').toLowerCase();
  for (let i = 0; i < str.length / 2; i++){
    if (str[i] !== str[str.length - i - 1]) {
      return 'Not a palindrome';
    }
  }
  return 'It is a palindrome';
}

findPalindrome('Лёша на полке клопа нашёл ');


/* 3 Функция, которая принимает строку, извлекает содержащиеся в ней
 цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 Если в строке нет ни одной цифры, функция должна вернуть NaN. */

function getNumbers (phrase) {
  if (typeof phrase === 'number') {
    const str = String(phrase).replaceAll('-','').toLowerCase();
    return Number(str);// при -1 сделать 1
  }
  let numbers = '';
  for (let i = 0; i <= phrase.length - 1; i++){
    //if (Number.parseInt(phrase.at(i),10) !== NaN) {
    if (!Number.isNaN(parseInt(phrase.at(i),10))) {
      numbers += phrase.at(i);
    }
  }
  return parseInt(numbers,10);
}

getNumbers(-15);


/* 4 Функция, которая принимает три параметра: исходную строку, минимальную
  длину и строку с добавочными символами — и возвращает исходную строку,
  дополненную указанными символами до заданной длины. Символы добавляются в
  начало строки. Если исходная строка превышает заданную длину, она не должна
  обрезаться. Если «добивка» слишком длинная, она обрезается с конца. */

function addSymbols (str, minLength, addStr) {
  let newStr = str;
  while (newStr.length < minLength) {
    const adding = (newStr.length + addStr.length <= minLength)
      ? addStr
      : addStr.slice(0, minLength - newStr.length - addStr.length);
    newStr = adding + newStr;
  }
  return newStr;
}

addSymbols('q', 4,'we');
