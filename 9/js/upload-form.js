import { isEscapeKey } from './utils.js';
import { MAXIMUM_HASHTAG_NUMBER, MAXIMUM_COMMENT_LENGTH } from './data.js';
import { resetScale, resetEffects } from './edit-picture.js';

const formDecoration = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('.img-upload__input');
const uploadCloseButton = formDecoration.querySelector('.img-upload__cancel');
const commentField = formDecoration.querySelector('.text__description');
const hashtagField = formDecoration.querySelector('.text__hashtags');
const submitButton = formDecoration.querySelector('.img-upload__submit');

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

formDecoration.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if (isValide) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
