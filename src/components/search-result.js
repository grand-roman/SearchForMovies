import AbstractComponent from "./abstract-component";

class SearchResult extends AbstractComponent {

  getTemplate() {
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">0</span></p>
  </div>`;
  }
}
export default SearchResult;
