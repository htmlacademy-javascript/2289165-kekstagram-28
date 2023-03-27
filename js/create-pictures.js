import {SIMILAR_PHOTO_SPECIFICATION_COUNT} from './data.js';
import {createPhotoSpecification} from './create-objects.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createMiniature(picture) {
  const newElement = pictureTemplate.cloneNode(true);
  newElement.querySelector('.picture__img').src = picture.url;
  //newElement.querySelector('.picture__img').src = `photos/${generatePhotoNumberInUrl()}.jpg`;
  newElement.querySelector('.picture__likes').textContent = picture.likes ;
  newElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return newElement;
}
/**
 * Create miniphotos on the main page
 */
function createModels() {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= SIMILAR_PHOTO_SPECIFICATION_COUNT; i++) {
    const picture = createPhotoSpecification();
    const newElement = createMiniature(picture);
    fragment.appendChild(newElement);
  }
  container.appendChild(fragment);
}

export {createModels};
