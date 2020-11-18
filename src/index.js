import './styles.css';
import cardTpl from './template/photo-card.hbs';
import ApiServise from './js/apiService';

const apiService = new ApiServise;

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.js-btn-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    apiService.query = e.target.elements.query.value;
    apiService.resetPage();

    if (apiService.query === '') {
        clearImagesGallery();
        console.log('To do new query'); // проверка на пустой запрос
        return
    }

    apiService.fetchImages().then(cards => {
        clearImagesGallery();

        if (cards.length === 0) {
            console.log('Неверный заапрос, сделайте другой запрос'); // проверка на неверный запрос
            return
        }

        appendImagesMarkUp(cards);
    });
}

function onLoadMore() {
    apiService.fetchImages().then(cards => {
        
        appendImagesMarkUp(cards)
    });
};


function appendImagesMarkUp(cards) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(cards));
}

function clearImagesGallery() {
    refs.galleryContainer.innerHTML = '';
}

    