const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const MAXIMUM_COMMENTS_NUMBER = 5;
const MAXIMUM_HASHTAG_NUMBER = 5;
const MAXIMUM_COMMENT_LENGTH = 140;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_EFFECT = EFFECTS[0];
const ALERT_SHOW_TIME = 5000;
const PICTURES_RAND_COUNT = 10;

export {
  MAXIMUM_COMMENTS_NUMBER, MAXIMUM_HASHTAG_NUMBER, MAXIMUM_COMMENT_LENGTH,
  SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE, EFFECTS, DEFAULT_EFFECT,
  ALERT_SHOW_TIME, PICTURES_RAND_COUNT, FILE_TYPES
};
