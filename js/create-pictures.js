const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createMiniature({ id, url, likes = 0, comments = 0, description }) {
  const newElement = pictureTemplate.cloneNode(true);
  newElement.querySelector('.picture__img').src = url;
  newElement.querySelector('.picture__likes').textContent = likes;
  newElement.querySelector('.picture__comments').textContent = comments.length;
  newElement.querySelector('.picture__img').alt = description;
  newElement.id = id;
  return newElement;
}

/**
 * Create miniphotos on the main page
 */
function createModels(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((value) => fragment.appendChild(createMiniature(value)));
  container.appendChild(fragment);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

}

export { createModels, createMiniature, container };
