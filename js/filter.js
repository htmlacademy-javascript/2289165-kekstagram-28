import { debounce, getPhotoSpecificationsFromServer } from './utils.js';
import { container, createMiniature } from './create-pictures.js';
import { PICTURES_RAND_COUNT } from './data.js';
import { createLoader } from './load.js';

const filterForm = document.querySelector('.img-filters__form');
const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomTenFilterButton = filterForm.querySelector('#filter-random');
const discussedFilterButton = filterForm.querySelector('#filter-discussed');

const createFilteredModels = (sortedData) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  sortedData.forEach((value) => fragment.appendChild(createMiniature(value)));
  container.appendChild(fragment);
};

const debouncedFilteredPictures = debounce(createFilteredModels);

const sortRand = () => Math.random() - 0.5;

const sortAscending = (elementOne, elementTwo) => elementTwo.comments.length - elementOne.comments.length;

const makeOneButtonActive = (buttonName) => {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonName.classList.add('img-filters__button--active');
};

const clearContainer = () => container.querySelectorAll('.picture').forEach((element) => element.remove());

const onDefaultFilterButtonClick = () => {
  makeOneButtonActive(defaultFilterButton);
  clearContainer();
  debouncedFilteredPictures(createLoader(getPhotoSpecificationsFromServer));
};

const onRandomTenFilterButtonClick = () => {
  makeOneButtonActive(randomTenFilterButton);
  const dataForPictures = createLoader(getPhotoSpecificationsFromServer).slice(0);
  clearContainer();
  debouncedFilteredPictures(dataForPictures.sort(sortRand).slice(0, PICTURES_RAND_COUNT));
};

const onDiscussedFilterButtonClick = () => {
  makeOneButtonActive(discussedFilterButton);
  const dataForPictures = createLoader(getPhotoSpecificationsFromServer).slice(0);
  const picturesAfterFilter = dataForPictures.sort(sortAscending);
  clearContainer();
  debouncedFilteredPictures(picturesAfterFilter);
};

defaultFilterButton.addEventListener('click', onDefaultFilterButtonClick);
randomTenFilterButton.addEventListener('click', onRandomTenFilterButtonClick);
discussedFilterButton.addEventListener('click', onDiscussedFilterButtonClick);


