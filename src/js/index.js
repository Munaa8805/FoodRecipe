require("@babel/polyfill");
import Search from "./model/search";

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
  const query = "pizza";

  if (query) {
    //// 2. Shine hailtiin obektiig uusgej ogno
    state.search = new Search(query);

    //// 3. Hailt hiihed zoriulj delgetsig UI beltgene

    //// 4. Hailtiig guitsetgene
    await state.search.doSearch();
    //// 5. Hailtiin ur dung delgetsend uzuulne
    console.log(state.search.result);
  }
};
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
