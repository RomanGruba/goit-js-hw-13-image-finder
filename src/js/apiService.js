export default {
  pageNumber: 1,
  per_page: 12,
  query: '',
  getUrl(pageNumber) {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '13241537-06d8871706b8937518ecf25ca';
    return `${baseUrl}?image_type=photo&orientation=horizontal&q=${
      this.query
    }&page=${pageNumber}&per_page=${this.per_page}&key=${key}`
  },
  fetchImg() {


    return fetch(
      this.getUrl(this.pageNumber),
    )
      .then(response => response.json())
      .then(response => {
        this.incrementPage();
        return response.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },

  set searchQuery(str) {
    this.query = str;
  },

  incrementPage() {
    this.pageNumber += 1;
  },

  resetPage() {
    this.pageNumber = 1;
  }
};
