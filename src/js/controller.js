//import {API_URL} from './config.js'
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView.js';
import addRecipeView from './views/addRecipeView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from '../../../complete-javascript-course/18-forkify/final/src/js/config.js';

// https://forkify-api.herokuapp.com/v2
// 15d5e97b-c556-46f0-99f2-35b071d4320e

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = '#5ed6604591c37cdc054bc90b';
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //1. Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //2. loading recipe
    await model.loadRecipe(id);

    //3. rendering recipe
    recipeView.render(model.state.recipe);

    // controlServings(model.state.recipe.servings);
  } catch (err) {
    alert('here>>inside contrlRecipes  ' + err);
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 0) spinner
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
    // resultsView.render(model.state.search.results);

    paginationView.render(model.state.search);
  } catch (err) {
    console.log('inside control search results Exception: ' + err);
  }
};

const controlPagination = function (goToPage) {
  //1) render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //2) render New Pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  console.log(model.state.recipe);
  console.log('bookmarked list*>>>>*****');
  console.log(model.state.bookmarks);

  // 2. update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // adding spinner
    addRecipeView.renderSpinner();

    console.log(`inside the controlAddREc`);
    await model.uploadRecipe(newRecipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  //note: calling the publisher inside the controller and passing the subscriber
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
