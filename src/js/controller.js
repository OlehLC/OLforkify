
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeview  from './views/recipeview.js'
import SearchView  from './views/searchView.js'
import resultview  from './views/resultView.js'
import bookmarksview  from './views/bookmarksView.js'
import paginationView  from './views/paginationView.js'
import addRecipeview  from './views/addRecipeview.js'
import { MODAL_CLOSE_SEC } from './config.js';




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//fetch
/*if(module.hot){
  module.hot.accept();
}*/
const controlrecipes= async function(){
  //Load recepie 
  try{
    

    const id=window.location.hash.slice(1);
    if(!id) return;// Якщо нема ід  
    recipeview.renderSpiner();// Spiner 
    //0)Update results to mark 

    bookmarksview.update(model.state.bookmarks);

    resultview.update(model.getSearchResultsPage());
    
     //Load recepie 
    await  model.loadrecipe(id);
//2 rend recepie 

recipeview.render(model.state.recipe);



  }catch(err){
    recipeview.renderError();
}

};

const controlSearchResults = async function(){
  try{
    resultview.renderSpiner();
    //1) Get search query 


  const query= SearchView.getQuery();
  if(!query) return;
//2) Load seacrh results  
    await model.loadSerresult(query);
    // 3) Render results  
    

    
    resultview.render(model.getSearchResultsPage());

    //render initial pagination 

    paginationView.render(model.state.search);
  }catch(err){
    console.log(err);
  }
};
const  controlPagination =function(gotopage){
  
  resultview.render(model.getSearchResultsPage(gotopage));
 
  //render initial pagination 
  paginationView.render(model.state.search);

};

const controlServings= function(newserwings){
  //Updating the recipe  servings (in state )
model.updateServigs(newserwings);
  // update the recipe view as well
  //recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);

};

const controlAddbookmark= function(){
  //1)Add or remove 
  if(!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe)
  else model.deletebookmark(model.state.recipe.id);
//2) Update 
  recipeview.update(model.state.recipe);
  //3)Render bookmarks
  bookmarksview.render(model.state.bookmarks);

}
const controlBookmarks = function(){
  bookmarksview.render(model.state.bookmarks)
}

const controlAddrecipe= async function (newRecipe){
  try{
    //Show spiner 
    addRecipeview.renderSpiner();
    await model.UploadRecipe(newRecipe);
    console.log(model.state.recipe);
//render  recipe 
recipeview.render(model.state.recipe);
//close

//render book mark
bookmarksview.render(model.state.bookmarks);

//change id in url 

window.history.pushState(null,'',`#${model.state.recipe.id}`)
addRecipeview.renderMessage();
setTimeout(function(){
  addRecipeview.toggleWindow()},MODAL_CLOSE_SEC*1000);
  }catch(err) {
    console.error('Jjijsijsi',err);
    addRecipeview.renderError(err.message);
  }

}
// # checking 
const initialization =function (){
  console.log('Welcome to my company !')
}

const init = function(){
  bookmarksview.addHandlerRender(controlBookmarks);
recipeview.addHandler(controlrecipes);
recipeview.addHandlerUpdateServings(controlServings);
recipeview.addHandlerAddbookmark(controlAddbookmark);
SearchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
addRecipeview._addHandkerUpload(controlAddrecipe);
console.log('Welcome');
initialization();
console.log('Welcome');
}
init(); 