import axios from 'axios';

export default class PixabayApiService {
  searchString;
  currentPage;
  itemsPerPage;
  myAxios;
  constructor(itemsPerPage = 20) {
    this.searchString = '';
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.myAxios = axios.create({
      baseURL: 'https://pixabay.com/api/',
      params: {
        key: '38745989-9379e45e0f2cd3b535fa8a330',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: itemsPerPage,
      },
    });
  }
  getSearchQuery() {
    return this.searchString;
  }
  set SearchQuery(newSearchQuery) {
    this.searchString = String(newSearchQuery).split(/ {1,}/).join('+');
    this.currentPage = 1;
  }
  async fetchImages() {
    const response = await this.myAxios({
      params: { q: this.searchString, page: this.currentPage },
    });
    this.totalHits = response.data.totalHits;
    this.currentPage += 1;
    return response;
  }
  isLastPage() {
    return this.currentPage > Math.ceil(this.totalHits / this.itemsPerPage);
  }
}