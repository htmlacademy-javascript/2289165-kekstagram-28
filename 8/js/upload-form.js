import { isEscapeKey } from './utils.js';

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
  uploadFile.value = '';
}

function validateComment(text) {
  if (text.length >= 140) {
    submitButton.disabled = true;
    return false;
  }
  submitButton.disabled = false;
  return true;
}

function validateHashtag(hashtagText) {
  const regForHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = hashtagText.split(' ');
  if (hashtagText === '') {
    submitButton.disabled = false;
    return true;
  }
  if (hashtags.length !== new Set(hashtags).size) {
    submitButton.disabled = true;
    return false;
  }
  let count = 0;
  for (const hashtag of hashtags) {
    const isValue = regForHashtag.test(hashtag);
    if (!isValue) {
      submitButton.disabled = true;
      return false;
    }
    if (count < 5 && hashtag.includes('#')) {
      count++;
    } else {
      submitButton.disabled = true;
      return false;
    }
  }
  submitButton.disabled = false;
  return true;
}

formDecoration.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
