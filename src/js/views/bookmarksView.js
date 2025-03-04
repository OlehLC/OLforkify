import View from './View.js';
import previewView  from './previewView.js'

class  bookmarksView extends View {
    _parentElement=document.querySelector('.bookmarks__list');
    _errorMes= 'No bookmarks yet. Find a nice recipe and bookmark it :) ';
    _message='';

    addHandlerRender(handler){
        window,addEventListener('load',handler);

    }
    _generateMarkup(){
     
        return this._data.map(bookmarks => previewView.render(bookmarks, false)).join('');
    };

}
export default new bookmarksView();