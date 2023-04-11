import { createModels } from './create-pictures.js';
import './full-size-picture.js';
import './upload-form.js';
import { showAlert } from './utils.js';
import { createLoader } from './load.js';

let similarPhotoSpecifications = [];

function getData(data) {
  similarPhotoSpecifications = data;
}

setTimeout(() => createModels(similarPhotoSpecifications), 200);
createLoader(getData, showAlert);

export { similarPhotoSpecifications };
