import { SIMILAR_PHOTO_SPECIFICATION_COUNT } from './data.js';
import {similarPhotoSpecifications } from './create-objects.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


function createMiniature({ url, likes, comments }) {
  const newElement = pictureTemplate.cloneNode(true);
  newElement.querySelector('.picture__img').src = url;
  newElement.querySelector('.picture__likes').textContent = likes;
  newElement.querySelector('.picture__comments').textContent = comments.length;

  return newElement;
}

/**
 * Create miniphotos on the main page
 */
function createModels() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < SIMILAR_PHOTO_SPECIFICATION_COUNT; i++) {
    fragment.appendChild(createMiniature(similarPhotoSpecifications[i]));
  }
  container.appendChild(fragment);
}

export { createModels };
