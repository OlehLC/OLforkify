import View from './View.js';
import previewView  from './previewView.js'
class  resultview extends View {
    _parentElement=document.querySelector('.results');
    _errorMes= 'No recepies for your query, try again please ) ';
    _message='';
    _generateMarkup(){
      
      return this._data.map(results => previewView.render(results, false)).join('');
  };

}
export default new resultview();