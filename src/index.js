import './styles.css';
import form from './templates/form.hbs';
import ul from './templates/ul.hbs';
import cards from './templates/cards.hbs';
import imgService from './js/apiService';

document.querySelector('#moreBtn').addEventListener('click', async () => {
  await renderCards();
  scroll();
});

document.querySelector('#queryBtn').addEventListener('click', queryUpdate);

renderForm();
renderUL();

function renderForm() {
  document.querySelector('.query').insertAdjacentHTML('afterbegin', form());
}

function renderUL() {
  document.querySelector('.query').insertAdjacentHTML('afterend', ul());
}

async function renderCards(query) {
  const fetchAnswer = await imgService.fetchImg(query);
  const markup = cards(fetchAnswer);
  document.querySelector('.gallery').insertAdjacentHTML('beforeEnd', markup);
}

function queryUpdate() {
  imgService.resetPage();
  document.querySelector('.gallery').innerHTML = '';
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
