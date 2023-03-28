import {SIMILAR_PHOTO_SPECIFICATION_COUNT} from './data.js';
import {createPhotoSpecification} from './create-objects.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = [];
const fragment = document.createDocumentFragment();

function createMiniature({url, likes, comments}) {
  const newElement = pictureTemplate.cloneNode(true);
  newElement.querySelector('.picture__img').src = url;
  newElement.querySelector('.picture__likes').textContent = likes ;
  newElement.querySelector('.picture__comments').textContent = comments.length;

  return newElement;
}

for (let i = 0; i < SIMILAR_PHOTO_SPECIFICATION_COUNT; i++) {
  pictures[i] = createMiniature(createPhotoSpecification());
  fragment.appendChild(pictures[i]);
}

/**
 * Create miniphotos on the main page
 */
function createModels() {
  container.appendChild(fragment);
}

export {createModels};
