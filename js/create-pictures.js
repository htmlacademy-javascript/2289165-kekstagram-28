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
function createModels(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((value)=>{
    fragment.appendChild(createMiniature(value));
  });
  container.appendChild(fragment);
}

export { createModels };
