import { elements } from "./base";

//// Private function
const renderRecipe = recipe => {
  const markup = `<li>
  <a class="likes__link" href="#${recipe.recipe_id}">
      <figure class="likes__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="likes__data">
          <h4 class="likes__name">${recipe.title}</h4>
          <p class="likes__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;
  //// ul ruu nemne
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
//// Export hiij bgaa function
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
  recipes.forEach(el => renderRecipe(el));
};
