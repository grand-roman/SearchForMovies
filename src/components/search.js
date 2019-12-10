import {getSearchTemplate} from './search-template.js';
import AbstractComponent from './abstract-component.js';

class Search extends AbstractComponent {

  constructor() {
    super();
  }

  get template() {
    return getSearchTemplate();
  }

}

export default Search;
