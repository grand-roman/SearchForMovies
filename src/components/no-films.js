import {createElement} from '../utils.js';

const getNoFilmCardTemplate = () => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`);
};

class NoFilmCard {

  constructor() {
    this._element = null;
  }

  get template() {
    return getNoFilmCardTemplate();
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  bind() {}

  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }
  unrender() {
    this._element = null;
  }
}
export default NoFilmCard;
