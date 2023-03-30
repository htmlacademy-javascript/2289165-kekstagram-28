import { createModels } from './create-pictures.js';
import { similarPhotoSpecifications } from './create-objects.js';
import { openFullSize } from './full-size-picture.js';

createModels(similarPhotoSpecifications);
openFullSize(document.querySelectorAll('.mini-picture'));
