import './styles.css';
import cardTpl from './template/photo-card.hbs';
import ApiServise from './js/apiService';

const apiService = new ApiServise;

const refs = {
    searchForm: document.querySelector('#search-form'),
    infoMessage:document.querySelector('.search-form-message'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.js-btn-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    apiService.query = e.target.elements.query.value;
    apiService.resetPage();
    onInfoMessage('');
    hideLoadMoreBtn();
    
    if (apiService.query === '') {    // проверка на пустой запрос
        clearImagesGallery();
        onInfoMessage('Enter value for search');  
        return
    }

    apiService.fetchImages().then(cards => {
        clearImagesGallery();

        if (cards.length === 0) {    // проверка на неверный запрос
            hideLoadMoreBtn();
            onInfoMessage('Not found results, please change your search query');
            return
        }

        appendImagesMarkUp(cards);

        if (cards.length === 12) {   //проверка на наличие картинок для след загрузки
            visibleLoadMoreBtn()
        }
    });
}

function onLoadMore(e) {
    apiService.fetchImages().then(cards => {
        const stepScroll = pageYOffset+e.clientY-30;
        appendImagesMarkUp(cards)
        onScrollToScreen(stepScroll);

        if (cards.length < 12) {   //проверка на наличие картинок для след загрузки
            hideLoadMoreBtn();
        }
    })
};

function appendImagesMarkUp(cards) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(cards));
}

function clearImagesGallery() {
    refs.galleryContainer.innerHTML = '';
}

function onInfoMessage(text) {
    refs.infoMessage.textContent = text;
}

function onScrollToScreen(position) {
    window.scrollTo({ top: position, behavior:"smooth"})
}

function hideLoadMoreBtn() {
 refs.loadMoreBtn.classList.add('is-hidden');   
}    

function visibleLoadMoreBtn() {
refs.loadMoreBtn.classList.remove('is-hidden');
} 
