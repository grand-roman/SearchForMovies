import {getFilmsListTemplate} from './film-list-template.js';
import {createElement} from '../utils.js';

class FilmList {

  constructor({isExtra, isVisuallyHidden, title, films,
    isButton, id}) {
    this._isExtra = isExtra;
    this._isVisuallyHidden = isVisuallyHidden;
    this._title = title;
    this._films = films;
    this._isButton = isButton;
    this._id = id;

    this._element = null;
  }

  get template() {
    return getFilmsListTemplate(
        this._isExtra,
        this._isVisuallyHidden,
        this._title,
        this._isButton,
        this._id
    );
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

export default FilmList;
