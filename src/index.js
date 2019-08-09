import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import InfiniteScroll from 'infinite-scroll';

import form from './templates/form.hbs';

import cards from './templates/cards.hbs';
import imgService from './js/apiService';

const refs = {
  gallery: document.querySelector('.gallery'),
  spinner: document.querySelector('.spinner'),
  moreBtn: document.querySelector('#moreBtn'),
  queryBtn: document.querySelector('#queryBtn'),
};

renderForm();

refs.moreBtn.addEventListener('click', async () => {
  await renderCards();
  scroll();
});

refs.queryBtn.addEventListener('click', queryUpdate);



refs.gallery.addEventListener('click', e => modalWindow(e));

function renderForm() {
  document.querySelector('.query').insertAdjacentHTML('afterbegin', form());
}

async function renderCards(query) {
  refs.spinner.classList.add('isActive');
  const fetchAnswer = await imgService.fetchImg(query);
  const markup = cards(fetchAnswer);
  refs.gallery.insertAdjacentHTML('beforeEnd', markup);
  refs.spinner.classList.remove('isActive');
}

function queryUpdate() {
  imgService.resetPage();
  refs.gallery.innerHTML = '';
  const newQuery = document.querySelector('input[name="query"]').value;
  imgService.searchQuery = newQuery;
  renderCards(newQuery);
}

function scroll() {
  let top = window.innerHeight - 50;
  window.scrollBy({
    top: top,
    behavior: 'smooth',
  });
}

function modalWindow(e) {
  if (e.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(`
  <a href=${e.target.dataset.url} target="_blank" rel="noopener noreferrer">
  <img width="1400" height="900" src=${e.target.dataset.source}>
  </a>
`);

    instance.show();
  }
}

const infScroll = new InfiniteScroll(refs.gallery, {
  path: () => '/',
  responseType: 'text',
  history: false,
});

infScroll.on('load', () => {
  imgService.incrementPage();
  renderCards();
});
