export default function (query) {
  const baseUrl = 'https://pixabay.com/api/';
  const key = '13241537-06d8871706b8937518ecf25ca';
  let pageNumber = 1;
  let per_page = 3;

  return fetch(`${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=${per_page}&key=${key}`)
    .then(response => response.json()).then(response => response.hits);

}
