const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '19265918-53e7e1b4cc966fb2ac418e7ff';
const photosPerPage = 12;

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 0;
  }

  fetchPhotos() {
    this.pageNumber += 1;
    return fetch(
      `${BASE_URL}&key=${API_KEY}&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${photosPerPage}`,
    ).then(res => res.json());
  }
  get query() {
    return this.searchQuery;
  }
  set query(query) {
    this.searchQuery = query;
  }
}
