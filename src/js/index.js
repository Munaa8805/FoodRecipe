require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";

import * as listView from "./view/listview";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe
} from "./view/recipeVeiw";
import Likes from "./model/like";
import * as LikesView from "./view/LikesView";

/*
 * Web app
 * Хайлтын query , ur dun
 * Tuhain uzuulj baigaa jor
 * Like lsan jor
 * Zahialj baigaa joriin nairlaga
 *
 *
 *
 */
const state = {};
//// Like zurhiig haah
LikesView.toggleLikeMenu(0);
const controlSearch = async () => {
  //// 1. Web-ees hailtiin tulhuur ugiig gargaj abna
  const query = searchView.getInput();

  if (query) {
    //// 2. Shine hailtiin obektiig uusgej ogno
    state.search = new Search(query);

    //// 3. Hailt hiihed zoriulj delgetsig UI beltgene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //// 4. Hailtiig guitsetgene
    await state.search.doSearch();
    //// 5. Hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Hailtaar ilertsgui bna");
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    //// html -iin DATA-GOTO gesen medeelelees toog gargaj abch bn
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/*
Joriin controller
*/
//// Hash oorchlogdoj baigaag barij abna
const controlRecipe = async () => {
  //// 1. URL-aas ID iig salgana
  const id = window.location.hash.replace("#", "");
  if (!state.likes) state.likes = new Likes();
  //// URL deer ID biagaa esehiig shalgana
  if (id) {
    //// 2 Joriin modeliig uusgene
    state.recipe = new Recipe(id);
    //// 3 Delgetsend beltgene

    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    //// 4 Joroo tataj abchirna
    await state.recipe.getRecipe();
    //// Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    //// Joroo delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));

/*
Nairlaganii controller

*/
const controlList = () => {
  //// Nairlaganii modeliig uusgene
  state.list = new List();
  //// CLEAR HIIJ BN
  listView.clearItems();

  //// Ug model ruu odoo haragdaj baigaa nairlagiig
  state.recipe.ingredients.forEach(n => {
    state.list.addItem(n);
    listView.renderItem(n);
  });
};
//// like control
const controlLike = () => {
  //// 1. Like modeliig uusgene
  if (!state.likes) state.likes = new Likes();

  //// 2. Jor like-tai bnuu uguig shalgaj ID g olj abah
  const currentRecipeId = state.recipe.id;
  //// 3. Ene joriig like-lsan esehiig shalgah
  if (state.likes.isLiked(currentRecipeId)) {
    //// 4. Like lasan bol Like-iig boliulna

    state.likes.deleteLike(currentRecipeId);
    //// Haragdaj baigaa like-iig tsesnees ustgana
    LikesView.deleteLike(currentRecipeId);
    //// Like btn haragdah baidliig boliulah
    LikesView.toggleLikeBtn(false);
  } else {
    //// 5. Like-gui bol like -lna

    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    LikesView.renderLike(newLike);
    LikesView.toggleLikeBtn(true);
  }
  LikesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

//// Button event listener
elements.recipeDiv.addEventListener("click", e => {
  if (e.target.matches(".recipe__btn, .recipe__btn * ")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love * ")) {
    controlLike();
  }
});
