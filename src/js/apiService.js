const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '19265918-53e7e1b4cc966fb2ac418e7ff';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this._pageNumber = 1;
    this._photosPerPage = 12;
  }

  fetchPhotos() {
    return fetch(
      `${BASE_URL}&key=${API_KEY}&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.photosPerPage}`,
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error();
          error.response = response;
          throw error;
        }
      })
      .then(response => response.json())
      .then(({ hits }) => {
        this.pageNumber += 1;
        return hits;
      });
  }
  set query(query) {
    this.searchQuery = query;
  }
  get query() {
    return this.searchQuery;
  }
  set pageNumber(value) {
    this._pageNumber = value;
  }
  get pageNumber() {
    return this._pageNumber;
  }
  set photosPerPage(value) {
    this._photosPerPage = value;
  }
  get photosPerPage() {
    return this._photosPerPage;
  }
}
