import {getFooterTemplate} from './footer-template.js';
import {createElement} from '../utils.js';

class Footer {

  constructor(countFilmCards) {
    this._countFilmCards = countFilmCards;
    this._element = null;
  }

  get template() {
    return getFooterTemplate(this._countFilmCards);
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

export default Footer;
