import {getSearchTemplate} from './search-template.js';
import {createElement} from '../utils.js';

class Search {

  constructor() {
    this._element = null;
  }

  get template() {
    return getSearchTemplate(this);
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  unrender() {
    this._element = null;
  }

  bind() {}

  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }
}

export default Search;
