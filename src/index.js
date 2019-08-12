import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
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
  let items = document.querySelectorAll('.photo__item');
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

const options = {
  rootMargin: '0px 0px 200px 0px',
};

const observer = new IntersectionObserver(() => {
  if (imgService.pageNumber > 1) {
    console.log('obs');
    renderCards();
    console.log(imgService.pageNumber);
  }
}, options);


observer.observe(refs.moreBtn);

