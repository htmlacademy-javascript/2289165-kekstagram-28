/**
 * Create an array (similarPhotoSpecifications) of 25 generated objects.
 */

const DESCRIPTION_PHOTO = [
  'Дар неуверенности',
  'Избыток пустоты',
  'Неутолимый голод',
  'Опасность обольщения',
  'Отвращение к любезностям',
  'Проживая ложь',
  'То, что здесь, не увидишь',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR_NAMES = [
  'Кевин',
  'Ник',
  'Марго',
  'Пенни',
  'Георг',
];

const MAX_AVATAR_NUMBER = 6;
const MAX_PHOTO_ID = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_PHOTO_NUMBER_IN_URL = 25;
const COMMENT_COUNT_UNDER_PHOTO = 2;
const SIMILAR_PHOTO_SPECIFICATION_COUNT = 25;

/**
 * Getting a random integer in a given interval inclusive.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 */
const getRandomInteger = function (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 *Get random array index
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * Keeping previous values and getting an unigue random integer in a given interval inclusive.
 */
function createRandomUniqueIntegerFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateCommentId = createRandomUniqueIntegerFromRangeGenerator(1, 1000);

/**
 * Create an object with information about comment
 * @property {number} id - Id of comment. Random. Must not be repeated.
 * @property {string} avatar - Address of img. (e.x. img/avatar-{{random number from 1 to 6}}.svg).
 * @property {string} message - Random string/s (1 or 2) from array MESSAGES
 * @property {string} name - Author's name
 */
const createCommentSpecification = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_NUMBER)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(AUTHOR_NAMES),
});

const generatePhotoId = createRandomUniqueIntegerFromRangeGenerator(1, MAX_PHOTO_ID);
const generateLikesCount = createRandomUniqueIntegerFromRangeGenerator(MIN_LIKES, MAX_LIKES);
const generatePhotoNumberInUrl = createRandomUniqueIntegerFromRangeGenerator(1, MAX_PHOTO_NUMBER_IN_URL);

/**
 * Create an object with information about photo
 * @property {number} id - Id of photo. From 1 to 25. Must not be repeated.
 * @property {string} url - Address of photo (e.x. photos/{{random number from 1 to 25}}.jpg)25. Must not be repeated.
 * @property {string} description - Description of photo.
 * @property {number} likes - Random number of likes from 15 to 200.
 * @property {object} comments - Array of objects with information about comment.
 */
const createPhotoSpecification = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoNumberInUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_PHOTO),
  likes: generateLikesCount(),
  comments: Array.from({ length: COMMENT_COUNT_UNDER_PHOTO }, createCommentSpecification),
});

const similarPhotoSpecifications = Array.from({ length: SIMILAR_PHOTO_SPECIFICATION_COUNT }, createPhotoSpecification);

