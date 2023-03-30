import { similarPhotoSpecifications } from './create-objects.js';

const fullSize = document.querySelector('.big-picture');
const fullSizePicture = fullSize.querySelector('.big-picture__img img');
const likesCount = fullSize.querySelector('.likes-count');
const commentsCount = fullSize.querySelector('.comments-count');
const commentsList = fullSize.querySelector('.social__comments');
const text = fullSize.querySelector('.social__caption');
const commentsCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeBtn = fullSize.querySelector('.big-picture__cancel');

function onMiniatureClick({ url, likes, comments, description }) {
  return function () {
    document.querySelector('body').classList.add('modal-open');
    fullSize.classList.remove('hidden');
    fullSizePicture.src = url;
    likesCount.textContent = likes;
    commentsCount.textContent = comments.length;
    for (let i = 0; i < comments.length; i++) {
      commentsList.querySelector(`li:nth-child(${i + 1}) p`).textContent = comments[i].message;
    }
    text.textContent = description;
    commentsCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onFullSizeEscKeydown);
    closeBtn.addEventListener('click', onCloseBtnClick);
  };
}


function openFullSize(photos) {
  photos.forEach((element) => {
    const spec = similarPhotoSpecifications.find(
      (x) => element.id == x.id
    );
    element.addEventListener('click', onMiniatureClick(spec));
  });
}

function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  fullSize.classList.add('hidden');
  commentsCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onFullSizeEscKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
}

function onFullSizeEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSize();
  }
}

function onCloseBtnClick() {
  closeFullSize();
}

export { openFullSize };
