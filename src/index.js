import './styles.css';
import form from './templates/form.hbs';
import ul from './templates/ul.hbs';
import cards from './templates/cards.hbs';
import fetchImg from './js/apiService';

function renderForm() {
  document.querySelector('.query').insertAdjacentHTML('afterbegin', form());
}

renderForm();

function renderUL() {
  document.querySelector('body').insertAdjacentHTML('beforeend', ul());
}

renderUL();

async function renderCards(query) {
  const fetchAnswer = await fetchImg(query);
  const markup = cards(fetchAnswer);
  document.querySelector('.gallery').insertAdjacentHTML('afterbegin', markup);
}

function queryUpdate() {
  document.querySelector('#queryBtn').addEventListener('click', e => {
    e.preventDefault();
    const newQuery = document.querySelector('input[name="query"]').value;
    renderCards(newQuery);
  });
}

queryUpdate();

// renderCards('cat');
