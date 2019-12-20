import {Position, unrender, render} from "../utils";
import NoSearch from "../components/no-search-result";
import SearchResult from "../components/search-result";

class SearchControlLer {
  constructor(container, filmData, search, page, mainContainer) {
    this._container = container;
    this._film = filmData;
    this._search = search;
    this._page = page;
    this._mainContainer = mainContainer;
  }
  init() {
    const noSearch = new NoSearch();
    const searchResult = new SearchResult();
    this._search.startSearch = () => {
      let filmSearch = [];
      if (this._search.researchValue().length > 2) {
        unrender(searchResult.getElement());
        this._mainContainer.querySelector(`.films-list__container`).textContent = ``;

        render(this._mainContainer, searchResult.getElement(), Position.AFTERBEGIN);
        const searchResultCount = searchResult.getElement().querySelector(`.result__count`);
        if (!this._mainContainer.querySelector(`.no-search-result`)) {
          this._mainContainer.querySelector(`.sort`).classList.add(`visually-hidden`);
          this._mainContainer.querySelector(`.main-navigation`).classList.add(`visually-hidden`);
          if (this._mainContainer.querySelector(`.films-list__show-more`)) {
            this._mainContainer.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
          }
        }
        const filmEtra = this._mainContainer.querySelectorAll(`.films-list--extra`);
        for (let it of filmEtra) {
          it.classList.add(`visually-hidden`);
        }
        for (let item of this._film) {
          let filmTitle = item.title.toLowerCase();
          if (filmTitle.includes(this._search.researchValue().replace(/,/g, ``).toLowerCase().trim()) || filmTitle === this._search.researchValue().replace(/,/g, ``).toLowerCase().trim()) {
            filmSearch.push(item);
          }
        }
        if (filmSearch.length === 0) {
          //this._mainContainer.querySelector(`.films-list__container`).innerHTML = `<div class="no-result">
           // There is no movies for your request.
           // </div>`;
        } else {
          const filmListContainer = this._mainContainer.querySelector(`.films-list__container`);
          this._page.unrenderCard();
          this._page.renderCard(filmListContainer, filmSearch);
        }
        searchResultCount.textContent = filmSearch.length;
      } else if (this._search.researchValue().length === 0) {
        this._search.searchReset();
      }
    };
    this._search.searchReset = () => {
      if (this._mainContainer.querySelector(`.no-search-result`)) {
        unrender(noSearch.getElement());
      }
      //else {
      //  this._page.unrenderAll();
      //}
      //this._page.render();
    };
    render(this._container, this._search.getElement(), Position.BEFOREEND);
  }
}
export default SearchControlLer;

