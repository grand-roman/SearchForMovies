import {getSortTemplate} from './sort-template.js';
import {createElement} from '../utils.js';

class Sort {

  constructor(sortType) {
    this._sortType = sortType;
    this._element = null;
  }

  get template() {
    return getSortTemplate(this._sortType);
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

export default Sort;
