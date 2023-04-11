import { isEscapeKey } from './utils.js';
import { MAXIMUM_HASHTAG_NUMBER, MAXIMUM_COMMENT_LENGTH } from './data.js';
import { resetScale, resetEffects } from './edit-picture.js';
import { sendData } from './load.js';

const formDecoration = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('.img-upload__input');
const uploadCloseButton = formDecoration.querySelector('.img-upload__cancel');
const commentField = formDecoration.querySelector('.text__description');
const hashtagField = formDecoration.querySelector('.text__hashtags');
const submitButton = formDecoration.querySelector('.img-upload__submit');
const formToSend = document.querySelector('.img-upload__form');
const successMessageTemplate = document.querySelector('#success');
const copySuccessMessage = successMessageTemplate.content.cloneNode(true);
const successField = copySuccessMessage.querySelector('.success');
const successButton = copySuccessMessage.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error');
const copyErrorMessage = errorMessageTemplate.content.cloneNode(true);
const errorField = copyErrorMessage.querySelector('.error');
const errorButton = copyErrorMessage.querySelector('.error__button');

const pristine = new Pristine(formDecoration, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

uploadFile.addEventListener('change', onUploadFileChange);
uploadCloseButton.addEventListener('click', onUpLoadCloseButton);

pristine.addValidator(commentField, validateComment);
pristine.addValidator(hashtagField, validateHashtag, 'Хеш-тег написан неверно');

function onUploadFileChange() {
  formDecoration.classList.remove('hidden');
  document.addEventListener('keydown', onFormDecorationEscKeydown);
  document.querySelector('body').classList.add('modal-open');
}

function onUpLoadCloseButton() {
  closeFormDecoration();
}

function onFormDecorationEscKeydown(evt) {
  const isTextFieldOnFocus = document.activeElement === commentField || document.activeElement === hashtagField;
  if (isEscapeKey(evt) && !isTextFieldOnFocus) {
    evt.preventDefault();
    closeFormDecoration();
  }
}

function closeFormDecoration() {
  formDecoration.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFormDecorationEscKeydown);
  resetScale();
  resetEffects();
  uploadFile.value = '';
  hashtagField.value = '';
  commentField.value = '';
}

function validateComment(text) {
  if (text.length > MAXIMUM_COMMENT_LENGTH) {
    return false;
  }
  return true;
}

function validateHashtag(text) {
  if (text === '') {
    return true;
  }
  const regForHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = text.split(' ');
  if (hashtags.length !== new Set(hashtags).size) {
    return false;
  }
  for (const hashtag of hashtags) {
    const isValue = regForHashtag.test(hashtag);
    if (!isValue) {
      return false;
    }
  }
  if (hashtags.length > MAXIMUM_HASHTAG_NUMBER) {
    return false;
  }

  return true;
}

formDecoration.addEventListener('input', () => {
  const isValide = pristine.validate();
  if (isValide) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

const setUserFormSubmit = (onSuccess, onError) => {
  formToSend.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValide = pristine.validate();
    if (isValide) {
      sendData(onSuccess, onError, new FormData(evt.target)
      );
    }
  });
};

setUserFormSubmit(getSuccessMessage, getErrorMessage);

function getErrorMessage() {
  document.body.append(errorField);
  document.addEventListener('keydown', onErrorFieldClickEscKeydown);
  errorButton.addEventListener('click', onErrorFieldClick);
  errorField.addEventListener('click', onErrorFieldClick);
}

function getSuccessMessage() {
  document.body.append(successField);
  successButton.addEventListener('click', onSuccessFieldClick);
  successField.addEventListener('click', onSuccessFieldClick);
  document.addEventListener('keydown', onSuccessFieldClickEscKeydown);
}

function onSuccessFieldClick() {
  document.body.removeChild(successField);
  closeFormDecoration();
  successButton.removeEventListener('click', onSuccessFieldClick);
  successField.removeEventListener('click', onSuccessFieldClick);
  document.removeEventListener('keydown', onSuccessFieldClickEscKeydown);
}


function onErrorFieldClick() {
  document.body.removeChild(errorField);
  document.removeEventListener('keydown', onErrorFieldClickEscKeydown);
  errorButton.removeEventListener('click', onErrorFieldClick);
  errorField.removeEventListener('click', onErrorFieldClick);
}

function onSuccessFieldClickEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessFieldClick();
  }
}

function onErrorFieldClickEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onErrorFieldClick();
  }
}

