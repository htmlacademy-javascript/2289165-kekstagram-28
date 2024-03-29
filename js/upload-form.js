import { isEscapeKey } from './utils.js';
import { MAXIMUM_HASHTAG_NUMBER, MAXIMUM_COMMENT_LENGTH, FILE_TYPES } from './data.js';
import { resetScale, resetEffects, imagePreview } from './edit-picture.js';
import { sendData } from './load.js';

const fileInput = document.querySelector('.img-upload__overlay');
const pictureInput = document.querySelector('.img-upload__input');
const uploadCloseButton = fileInput.querySelector('.img-upload__cancel');
const commentInput = fileInput.querySelector('.text__description');
const hashtagInput = fileInput.querySelector('.text__hashtags');
const submitButton = fileInput.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');

const successMessageTemplate = document.querySelector('#success');
const copySuccessMessage = successMessageTemplate.content.cloneNode(true);
const successField = copySuccessMessage.querySelector('.success');
const successButton = copySuccessMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error');
const copyErrorMessage = errorMessageTemplate.content.cloneNode(true);
const errorField = copyErrorMessage.querySelector('.error');
const errorButton = copyErrorMessage.querySelector('.error__button');

const pristine = new Pristine(fileInput, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const closeFileInput = () => {
  fileInput.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFileInputEscKeydown);
  resetScale();
  resetEffects();
  pictureInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

const onUpLoadCloseButton = () => closeFileInput();

const validateComment = (text) => {
  if (text.length > MAXIMUM_COMMENT_LENGTH) {
    return false;
  }
  return true;
};

const validateHashtag = (text) => {
  if (text === '') {
    return true;
  }
  const regForHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = text.split(' ').filter((hashtag) => hashtag !== '');
  if (hashtags.length !== new Set(hashtags).size) {
    return false;
  }
  if (hashtags.length > MAXIMUM_HASHTAG_NUMBER) {
    return false;
  }
  for (const hashtag of hashtags) {
    const isValue = regForHashtag.test(hashtag);
    if (!isValue) {
      return false;
    }
  }
  return true;
};

const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      submitButton.disabled = true;
      sendData(onSuccess, onError, new FormData(evt.target));
      document.removeEventListener('keydown', onFileInputEscKeydown);
    }
  });
};

const onErrorFieldClick = (evt) => {
  if (evt.target.className !== 'error__inner'
    && evt.target.className !== 'error__title') {
    evt.preventDefault();
    document.body.removeChild(errorField);
    document.removeEventListener('keydown', onErrorFieldKeydownEsc);
    errorButton.removeEventListener('click', onErrorFieldClick);
    errorField.removeEventListener('click', onErrorFieldClick);
    document.addEventListener('keydown', onFileInputEscKeydown);
    submitButton.disabled = false;
  }
};

const getErrorMessage = () => {
  document.body.append(errorField);
  document.addEventListener('keydown', onErrorFieldKeydownEsc);
  errorButton.addEventListener('click', onErrorFieldClick);
  errorField.addEventListener('click', onErrorFieldClick);
};

const onSuccessFieldClick = (evt) => {
  if (evt.target.className !== 'success__inner'
    && evt.target.className !== 'success__title') {
    evt.preventDefault();
    document.body.removeChild(successField);
    closeFileInput();
    successButton.removeEventListener('click', onSuccessFieldClick);
    successField.removeEventListener('click', onSuccessFieldClick);
    document.removeEventListener('keydown', onSuccessFieldKeydownEsc);
  }
};

const getSuccessMessage = () => {
  document.body.append(successField);
  successButton.addEventListener('click', onSuccessFieldClick);
  successField.addEventListener('click', onSuccessFieldClick);
  document.addEventListener('keydown', onSuccessFieldKeydownEsc);
};

pictureInput.addEventListener('change', () => {
  submitButton.disabled = false;
  fileInput.classList.remove('hidden');
  document.addEventListener('keydown', onFileInputEscKeydown);
  document.querySelector('body').classList.add('modal-open');
  const file = pictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
});

uploadCloseButton.addEventListener('click', onUpLoadCloseButton);

pristine.addValidator(commentInput, validateComment);
pristine.addValidator(hashtagInput, validateHashtag, 'Хеш-тег написан неверно');

fileInput.addEventListener('input', () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
    return;
  }
  submitButton.disabled = true;
});

setUserFormSubmit(getSuccessMessage, getErrorMessage);

function onFileInputEscKeydown(evt) {
  const isTextFieldOnFocus = document.activeElement === commentInput || document.activeElement === hashtagInput;
  if (isEscapeKey(evt) && !isTextFieldOnFocus) {
    evt.preventDefault();
    closeFileInput();
  }
}

function onErrorFieldKeydownEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.body.removeChild(errorField);
    document.removeEventListener('keydown', onErrorFieldKeydownEsc);
    errorButton.removeEventListener('click', onErrorFieldClick);
    errorField.removeEventListener('click', onErrorFieldClick);
    document.addEventListener('keydown', onFileInputEscKeydown);
    submitButton.disabled = false;
  }
}

function onSuccessFieldKeydownEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.body.removeChild(successField);
    closeFileInput();
    successButton.removeEventListener('click', onSuccessFieldClick);
    successField.removeEventListener('click', onSuccessFieldClick);
    document.removeEventListener('keydown', onSuccessFieldKeydownEsc);
  }
}
