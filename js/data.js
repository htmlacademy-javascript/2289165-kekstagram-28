/**
 * Create an array (similarPhotoSpecifications) of 25 generated objects.
 */

const DESCRIPTIONS_PHOTO = [
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
const COMMENT_COUNT_UNDER_PHOTO = 27;
const SIMILAR_PHOTO_SPECIFICATION_COUNT = 25;
const MAXIMUM_COMMENTS_NUMBER = 5;

export {DESCRIPTIONS_PHOTO, MESSAGES, AUTHOR_NAMES, MAX_AVATAR_NUMBER, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES, MAX_PHOTO_NUMBER_IN_URL,
  COMMENT_COUNT_UNDER_PHOTO, SIMILAR_PHOTO_SPECIFICATION_COUNT, MAXIMUM_COMMENTS_NUMBER};
