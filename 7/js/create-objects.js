import { getRandomInteger, getRandomArrayElement, createRandomUniqueIntegerFromRangeGenerator } from './rand.js';
import {
  DESCRIPTIONS_PHOTO, MESSAGES, AUTHOR_NAMES, MAX_AVATAR_NUMBER, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES,
  MAX_PHOTO_NUMBER_IN_URL, COMMENT_COUNT_UNDER_PHOTO, SIMILAR_PHOTO_SPECIFICATION_COUNT
} from './data.js';

const generateCommentId = createRandomUniqueIntegerFromRangeGenerator(1, 1000);

/**
 * Create an object with information about comment
 * @property {number} id - Id of comment. Random. Must not be repeated.
 * @property {string} avatar - Address of img. (e.x. img/avatar-{{random number from 1 to 6}}.svg).
 * @property {string} message - Random string/s (1 or 2) from array MESSAGES
 * @property {string} name - Author's name
 */
function createCommentSpecification() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_NUMBER)}.svg`,
    message: `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`,
    name: getRandomArrayElement(AUTHOR_NAMES),
  };
}

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
function createPhotoSpecification() {
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoNumberInUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
    likes: generateLikesCount(),
    comments: Array.from({ length: COMMENT_COUNT_UNDER_PHOTO }, createCommentSpecification),
  };
}

const similarPhotoSpecifications = Array.from({ length: SIMILAR_PHOTO_SPECIFICATION_COUNT }, createPhotoSpecification);

export { similarPhotoSpecifications };
