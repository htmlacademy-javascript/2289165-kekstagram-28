import { debounce } from './utils.js';
import { container, similarPhotoSpecifications, createMiniature } from './create-pictures.js';
import {PICTURES_RAND_COUNT} from './data.js';

const filterForm = document.querySelector('.img-filters__form');
const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomTenFilterButton = filterForm.querySelector('#filter-random');
const discussedFilterButton = filterForm.querySelector('#filter-discussed');

defaultFilterButton.addEventListener('click', onDefaultFilterButtonClick);
randomTenFilterButton.addEventListener('click', onRandomTenFilterButtonClick);
discussedFilterButton.addEventListener('click', onDiscussedFilterButtonClick);

const sortRand = () => Math.random() - 0.5;

const sortAscending = (elementOne, elementTwo) => {
  if (elementOne.comments.length < elementTwo.comments.length) {
    return 1;
  }
  if (elementOne.comments.length > elementTwo.comments.length) {
    return -1;
  }
  return 0;
};

const debouncedFilteredPictures = debounce(createfilteredModels);

function onDefaultFilterButtonClick() {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  defaultFilterButton.classList.add('img-filters__button--active');
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  debouncedFilteredPictures(similarPhotoSpecifications);

}

function onRandomTenFilterButtonClick() {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  randomTenFilterButton.classList.add('img-filters__button--active');
  const dataForPictures = similarPhotoSpecifications.slice(0);
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  debouncedFilteredPictures(dataForPictures.sort(sortRand).slice(0, PICTURES_RAND_COUNT));
}

function onDiscussedFilterButtonClick() {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  discussedFilterButton.classList.add('img-filters__button--active');
  const dataForPictures = similarPhotoSpecifications.slice(0);
  const picturesAfterFilter = dataForPictures.sort(sortAscending);
  debouncedFilteredPictures(picturesAfterFilter);
}

function createfilteredModels(sortedData) {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  sortedData.forEach((value) => fragment.appendChild(createMiniature(value)));
  container.appendChild(fragment);
}
