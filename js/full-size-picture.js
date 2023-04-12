import { container } from './create-pictures.js';
import { MAXIMUM_COMMENTS_NUMBER } from './data.js';
import { isEscapeKey, getPhotoSpecificationsFromServer } from './utils.js';
import {createLoader} from './load.js';


const fullSize = document.querySelector('.big-picture');
const fullSizePicture = fullSize.querySelector('.big-picture__img img');
const likesCount = fullSize.querySelector('.likes-count');
const commentsCount = fullSize.querySelector('.comments-count');
const commentsList = fullSize.querySelector('.social__comments');
const textAboutPicture = fullSize.querySelector('.social__caption');
const commentsCountBlock = fullSize.querySelector('.social__comment-count');
const closeButton = fullSize.querySelector('.big-picture__cancel');
const oneCommentType = commentsList.querySelector(`li:nth-child(${1})`).cloneNode(true);
const loadMoreCommentsButton = fullSize.querySelector('.comments-loader');


container.addEventListener('click', onContainerClick);
closeButton.addEventListener('click', onCloseButtonClick);
loadMoreCommentsButton.addEventListener('click',
  () => onLoadMoreCommentsButtonClick(getDataForPicture(loadMoreCommentsButton.id).comments));

function onContainerClick(evt) {
  if (evt.target.className === 'picture__img') {
    enlargeMiniature(getDataForPicture(evt.target.closest('a').id));
  }
}

function onFullSizeEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSize();
  }
}

function onCloseButtonClick() {
  closeFullSize();
}

function onLoadMoreCommentsButtonClick(comments) {
  commentsList.appendChild(loadMoreComments(comments));
  if (commentsList.children.length === comments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  }
  commentsCountBlock.textContent = `${commentsList.childElementCount} из ${comments.length} комментариев`;
}

function enlargeMiniature({ id, url, likes, comments, description }) {
  document.querySelector('body').classList.add('modal-open');
  fullSize.classList.remove('hidden');

  document.addEventListener('keydown', onFullSizeEscKeydown);

  fullSizePicture.id = id;
  fullSizePicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  loadMoreCommentsButton.id = fullSizePicture.id;

  commentsList.replaceChildren();
  for (let i = 0; i < Math.min(comments.length, MAXIMUM_COMMENTS_NUMBER); i++) {
    commentsList.appendChild(createOneComment(getDataForPicture(fullSizePicture.id).comments, i));
  }
  textAboutPicture.textContent = description;
  if (commentsList.children.length === comments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
  commentsCountBlock.textContent = `${commentsList.childElementCount} из ${comments.length} комментариев`;
  commentsCountBlock.classList.remove('hidden');
}
// createLoader
function getDataForPicture(id) {
  return createLoader(getPhotoSpecificationsFromServer).find((photoSpecification) => Number(id) === photoSpecification.id);
}

function createOneComment(comments, index) {
  const oneComment = oneCommentType.cloneNode(true);
  oneComment.querySelector('.social__text').textContent = comments[index].message;
  oneComment.querySelector('.social__picture').src = comments[index].avatar;
  oneComment.querySelector('.social__picture').alt = comments[index].name;
  return oneComment;
}

function loadMoreComments(comments) {
  const fragment = document.createDocumentFragment();
  const countOfCommentsInList = commentsList.children.length;
  for (let i = countOfCommentsInList;
    i < Math.min(comments.length, countOfCommentsInList + MAXIMUM_COMMENTS_NUMBER);
    i++) {
    fragment.appendChild(createOneComment(comments, i));
  }
  return fragment;
}

function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  fullSize.classList.add('hidden');
  document.removeEventListener('keydown', onFullSizeEscKeydown);
}
