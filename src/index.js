import './styles.css';
import cardTpl from './template/photo-card.hbs';
const debounce = require('lodash.debounce');

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    nextButton: document.querySelector('.js-btn-more'),
}


function fetchImages(searchText) {
    const BASE_URL = 'https://pixabay.com/api';
    const API_KEY = '19030370-3b0ac62398e7506ebf605c4ab'
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchText}&page=1&per_page=12&key=${API_KEY}`)
        .then(resp => resp.json())
        .then(cards => cards.hits);
}
        
fetchImages('cat').then(cards => {
    const cardsMarkup = cardTpl(cards);
    refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);
});

