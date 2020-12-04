import './css/styles.scss';
import ShowSearchResult from './js/show-search-result';

const showSearchResult = new ShowSearchResult({
  formRef: '#search-form',
  containerRef: '.js-gallery-cards',
});
showSearchResult.init();
