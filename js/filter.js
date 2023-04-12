import { debounce, getPhotoSpecificationsFromServer } from './utils.js';
import { container, createMiniature } from './create-pictures.js';
import { PICTURES_RAND_COUNT } from './data.js';
import { createLoader } from './load.js';

const filterForm = document.querySelector('.img-filters__form');
const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomTenFilterButton = filterForm.querySelector('#filter-random');
const discussedFilterButton = filterForm.querySelector('#filter-discussed');

defaultFilterButton.addEventListener('click', onDefaultFilterButtonClick);
randomTenFilterButton.addEventListener('click', onRandomTenFilterButtonClick);
discussedFilterButton.addEventListener('click', onDiscussedFilterButtonClick);

const debouncedFilteredPictures = debounce(createFilteredModels);

function sortRand() {
  return Math.random() - 0.5;
}

function sortAscending(elementOne, elementTwo) {
  if (elementOne.comments.length < elementTwo.comments.length) {
    return 1;
  }
  if (elementOne.comments.length > elementTwo.comments.length) {
    return -1;
  }
  return 0;
}

function makeOneButtonActive(buttonName) {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonName.classList.add('img-filters__button--active');
}

function clearContainer() {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
}

function onDefaultFilterButtonClick() {
  makeOneButtonActive(defaultFilterButton);
  clearContainer();
  debouncedFilteredPictures(createLoader(getPhotoSpecificationsFromServer));
}

function onRandomTenFilterButtonClick() {
  makeOneButtonActive(randomTenFilterButton);
  const dataForPictures = createLoader(getPhotoSpecificationsFromServer).slice(0);
  clearContainer();
  debouncedFilteredPictures(dataForPictures.sort(sortRand).slice(0, PICTURES_RAND_COUNT));
}

function onDiscussedFilterButtonClick() {
  makeOneButtonActive(discussedFilterButton);
  const dataForPictures = createLoader(getPhotoSpecificationsFromServer).slice(0);
  const picturesAfterFilter = dataForPictures.sort(sortAscending);
  clearContainer();
  debouncedFilteredPictures(picturesAfterFilter);
}

function createFilteredModels(sortedData) {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  sortedData.forEach((value) => fragment.appendChild(createMiniature(value)));
  container.appendChild(fragment);
}
