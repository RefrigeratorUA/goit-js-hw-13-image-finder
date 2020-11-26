import 'material-design-icons/iconfont/material-icons.css';
import './styles.scss';
import PhotosApiService from './js/apiService';
import listTpl from './templates/list.hbs';

const photosApi = new PhotosApiService();

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.js-gallery-cards'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSubmitForm(event) {
  event.preventDefault();

  photosApi.query = event.currentTarget.query.value;

  photosApi.fetchPhotos().then(data => {
    console.log(listTpl(data.hits));
    refs.galleryList.innerHTML = listTpl(data.hits);
  });
}

function onLoadMoreClick() {
  photosApi.fetchPhotos().then(data => {
    refs.galleryList.insertAdjacentHTML('beforeend', listTpl(data.hits));
  });
}
