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
  elements.pageButtons.innerHTML = "";
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //// Page = 2 , start 10 , end 20 bna
  //// hailtiin ur dung huudaslaj bna

  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  //// Huudaslaj delgetsruu haruulah gej bn
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

/// type ===> 'prev' , 'next'
const createButton = (page, type, direction) => `
<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;
  if (currentPage === 1 && totalPages > 1) {
    //// 1 r huudas deer bn , 2 r huudas gedeg tovshiig garga
    buttonHTML = createButton(2, "next", "right");
    //// 2 rhamgiin suuliin huudas baibal
  } else if (currentPage < totalPages) {
    buttonHTML = createButton(currentPage - 1, "prev", "left");
    buttonHTML += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    //// Omnoh ruu shiljuulnee
    buttonHTML = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};
