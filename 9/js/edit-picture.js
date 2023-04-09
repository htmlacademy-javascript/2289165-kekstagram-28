import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE, EFFECTS, DEFAULT_EFFECT } from './data.js';

const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
let chosenEffect = DEFAULT_EFFECT;

scaleButtonSmaller.addEventListener('click', onSmalleButtonClick);
scaleButtonBigger.addEventListener('click', onBiggerButtonClick);

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

function onSmalleButtonClick() {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePicture(newValue);
}

function onBiggerButtonClick() {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePicture(newValue);
}

function scalePicture(value) {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
}

function resetScale() {
  return scalePicture(DEFAULT_SCALE);
}

function isDefault() {
  return chosenEffect === DEFAULT_EFFECT;
}

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
}

function updateSlider() {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
}

function onEffectsChange(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreview.classList = `effects__preview--${chosenEffect.name}`;
  updateSlider();
}

function onSliderUpdate() {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imagePreview.style.filter = `${chosenEffect.style}(${sliderValue + chosenEffect.unit})`;
  }
  effectLevelValue.value = sliderValue;
}

function resetEffects() {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
}

export { resetScale, resetEffects };
