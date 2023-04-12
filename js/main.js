import { createModels } from './create-pictures.js';
import './full-size-picture.js';
import './upload-form.js';
import { showAlert } from './utils.js';
import { createLoader } from './load.js';

createLoader(createModels, showAlert);
