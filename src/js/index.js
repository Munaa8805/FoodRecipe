require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe
} from "./view/recipeVeiw";

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
  renderRecipe(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
