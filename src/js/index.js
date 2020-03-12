require("@babel/polyfill");
import Search from "./model/search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";

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
    //// 4. Hailtiig guitsetgene
    await state.search.doSearch();
    //// 5. Hailtiin ur dung delgetsend uzuulne
    if (state.search.result === undefined) alert("Hailtaar ilertsgui bna");
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
