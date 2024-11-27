import View from './View.js';
import icons from 'url:../../img/icons.svg';
class  addRecipeView extends View {
    _parentElement=document.querySelector('.upload');
    _message='Pecipe was succesfully uploaded ';
    _window=document.querySelector('.add-recipe-window');
    _overlay=document.querySelector('.overlay');
    _bntOpen=document.querySelector('.nav__btn--add-recipe');
    _bntClose=document.querySelector('.btn--close-modal');


constructor(){
    super();
    this._addHandlerShowwindow();
    this._addHandlerClosewindow();
}

toggleWindow(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
}
    _addHandlerShowwindow(){
    this._bntOpen.addEventListener('click',this.toggleWindow.bind(this));
    } 

    _addHandlerClosewindow(){
    this._bntClose.addEventListener('click',this.toggleWindow.bind(this));
    this._overlay.addEventListener('click',this.toggleWindow.bind(this));

    }
    _addHandkerUpload(handler){
        this._parentElement.addEventListener('submit',function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const data= Object.fromEntries(dataArr);
         handler(data);
        })
    }
_generateMarkup(){
}
}
export default new addRecipeView();