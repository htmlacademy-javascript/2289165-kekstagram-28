import { similarPhotoSpecifications } from './create-objects.js';
import { container } from './create-pictures.js';

const MAXIMUM_COMMENTS_NUMBER = 5;

const fullSize = document.querySelector('.big-picture');
const fullSizePicture = fullSize.querySelector('.big-picture__img img');
const likesCount = fullSize.querySelector('.likes-count');
const commentsCount = fullSize.querySelector('.comments-count');
const commentsList = fullSize.querySelector('.social__comments');
const textAboutPicture = fullSize.querySelector('.social__caption');
const commentsCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = fullSize.querySelector('.big-picture__cancel');
const oneCommentType = commentsList.querySelector(`li:nth-child(${1})`).cloneNode(true);
const loadMoreCommentsButton = fullSize.querySelector('.comments-loader');


container.addEventListener('click', onContainerClick);
closeButton.addEventListener('click', onCloseButtonClick);

function onContainerClick(evt) {
  if (evt.target.className === 'picture__img') {
    enlargeMiniature(getDataForPicture(evt.target.closest('a').id));
  }
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

function onLoadMoreCommentsButtonClick({ comments }) {
  commentsList.appendChild(loadMoreComments({ comments }));
  commentsCountBlock.innerHTML = `${commentsList.childElementCount} из ${comments.length} комментариев`;
}

function enlargeMiniature({ id, url, likes, comments, description }) {
  document.querySelector('body').classList.add('modal-open');
  fullSize.classList.remove('hidden');

  document.addEventListener('keydown', onFullSizeEscKeydown);

  fullSizePicture.id = id;
  fullSizePicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;

  commentsList.replaceChildren();
  const dataOfPicture = getDataForPicture(fullSizePicture.id);
  for (let i = 0; i < MAXIMUM_COMMENTS_NUMBER; i++) {
    commentsList.appendChild(createOneComment(dataOfPicture, i));
  }
  textAboutPicture.textContent = description;

  commentsCountBlock.innerHTML = `${commentsList.childElementCount} из ${comments.length} комментариев`;
  commentsCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  loadMoreCommentsButton.addEventListener('click', () => onLoadMoreCommentsButtonClick(dataOfPicture));
}

function getDataForPicture(id) {
  const data = similarPhotoSpecifications
    .find((photoSpecification) => Number(id) === photoSpecification.id);
  return data;
}

function createOneComment({ comments }, count) {
  const oneComment = oneCommentType.cloneNode(true);
  oneComment.querySelector('.social__text').textContent = comments[count].message;
  oneComment.querySelector('.social__picture').src = comments[count].avatar;
  oneComment.querySelector('.social__picture').alt = comments[count].name;
  return oneComment;
}

function loadMoreComments({ comments }) {
  const fragment = document.createDocumentFragment();
  for (let i = commentsList.childElementCount;
    i < Math.min(comments.length, commentsList.childElementCount + MAXIMUM_COMMENTS_NUMBER);
    i++) {
    fragment.appendChild(createOneComment({ comments }, i));

  }
  return fragment;
}

function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  fullSize.classList.add('hidden');
  document.removeEventListener('keydown', onFullSizeEscKeydown);
}
