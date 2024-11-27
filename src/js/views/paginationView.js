import View from './View.js';
import icons from 'url:../../img/icons.svg';
class  paginationView extends View {
    _parentElement=document.querySelector('.pagination');



    addHandlerClick(handler){
this._parentElement.addEventListener('click',function(e){
const btn= e.target.closest('.btn--inline');
if(!btn) return;
const gotopage=+btn.dataset.goto;
handler(gotopage);
});
}
_generateMarkup(){
    const CurrentPage=this._data.page;
    const numPage = Math.ceil(this._data.results.length /this._data.resultsPerPage);
  
//Page 1, and other pages 
if( CurrentPage ===1 && numPage>1){
    return `
    <button data-goto="${CurrentPage+1}" class="btn--inline pagination__btn--next">
  <span>Page ${CurrentPage+1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button> 
    `;
}

//page last 
if( CurrentPage === numPage && numPage>1){
    return `
    <button data-goto="${CurrentPage-1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${ CurrentPage-1}</span>
  </button> ` ;
}
// page before and after
if( CurrentPage<numPage ){
    return`
    <button data-goto="${CurrentPage-1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${ CurrentPage-1}</span>
  </button> 
  <button data-goto="${CurrentPage+1}" class="btn--inline pagination__btn--next">
  <span>Page ${CurrentPage+1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button> 
` ;}
//page 1 and no ather pages 
if( CurrentPage ===1 && numPage===1){
    return
}



}
};
export default new paginationView();