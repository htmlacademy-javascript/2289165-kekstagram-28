import { similarPhotoSpecifications } from './create-objects.js';
import { container } from './create-pictures.js';

const fullSize = document.querySelector('.big-picture');
const fullSizePicture = fullSize.querySelector('.big-picture__img img');
const likesCount = fullSize.querySelector('.likes-count');
const commentsCount = fullSize.querySelector('.comments-count');
const commentsList = fullSize.querySelector('.social__comments');
const textAboutPicture = fullSize.querySelector('.social__caption');
const commentsCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = fullSize.querySelector('.big-picture__cancel');

container.addEventListener('click', onContainerClick);
closeButton.addEventListener('click', onCloseButtonClick);

function enlargeMiniature({ url, likes, comments, description }) {
  document.querySelector('body').classList.add('modal-open');
  fullSize.classList.remove('hidden');

  document.addEventListener('keydown', onFullSizeEscKeydown);

  fullSizePicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  for (let i = 0; i < comments.length; i++) {
    commentsList.querySelector(`li:nth-child(${i + 1}) p`).textContent = comments[i].message;
  }
  textAboutPicture.textContent = description;

  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function getDataForPicture(id) {
  return similarPhotoSpecifications.find((photoSpecification) => Number(id) === photoSpecification.id);
}

function onContainerClick(evt) {
  if (evt.target.className === 'picture__img') {
    enlargeMiniature(getDataForPicture(evt.target.closest('a').id));
  }
}

function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  fullSize.classList.add('hidden');
  commentsCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onFullSizeEscKeydown);
}

function onFullSizeEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSize();
  }
}

function onCloseButtonClick() {
  closeFullSize();
}

