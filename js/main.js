import './full-size-picture.js';
import './upload-form.js';
import './filter.js';
import { createModels } from './create-pictures.js';
import { showAlert } from './utils.js';
import { createLoader } from './load.js';

createLoader(createModels, showAlert);
