import {getStatisticTemplate} from './statistic-template.js';
import {createElement} from '../utils.js';

class Statistic {

  constructor(userRating, filters, textList) {
    this._userRating = userRating;
    this._filters = filters;
    this._textList = textList;

    this._element = null;
  }

  get template() {
    return getStatisticTemplate(
        this._userRating,
        this._filters,
        this._textList);
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

export default Statistic;
