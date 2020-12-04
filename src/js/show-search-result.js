import 'material-design-icons/iconfont/material-icons.css';
import PhotosApiService from './apiService';
import LoadMoreBtn from './load-more-btn';
import listTpl from '../templates/list.hbs';

const photosApi = new PhotosApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

export default class ShowSearchResult {
  constructor({ formRef, containerRef }) {
    this._refs = {
      searchForm: document.querySelector(formRef),
      galleryList: document.querySelector(containerRef),
    };
  }
  init() {
    this._refs.searchForm.addEventListener('submit', this.onSubmitForm.bind(this));
    loadMoreBtn.refs.button.addEventListener('click', this.loadAndShowPhotos.bind(this));
  }
  onSubmitForm(event) {
    event.preventDefault();

    photosApi.query = event.currentTarget.query.value;
    photosApi.pageNumber = 1;

    loadMoreBtn.show();
    this.clearGallery();
    this.loadAndShowPhotos();
  }

  clearGallery() {
    this._refs.galleryList.innerHTML = '';
  }

  addToGallery(data) {
    this._refs.galleryList.insertAdjacentHTML('beforeend', listTpl(data));
  }

  async loadAndShowPhotos() {
    loadMoreBtn.disable();
    const containerHeight = this._refs.galleryList.getBoundingClientRect().height;
    await photosApi
      .fetchPhotos()
      .then(data => {
        if (data.length > 0 && data.length < photosApi.photosPerPage) {
          this.addToGallery(data);
          loadMoreBtn.hide();
          return;
        } else if (data.length === 0) {
          loadMoreBtn.hide();
          return;
        }
        this.addToGallery(data);
        loadMoreBtn.enable();
      })
      .catch(error => {
        console.log(error);
      });
    window.scrollTo({
      top: containerHeight,
      behavior: 'smooth',
    });
  }
}
