
import {getFilmDetailsTemplate} from './film-details-template.js';
import {KEYS, createElement} from '../utils.js';

class FilmDetails {

  constructor({img, age, title, rating, director, writers,
    actors, year, duration, country, genres, description, comments},
  controlsTypes, emojiList) {

    this._filmDetalis = {
      img,
      age,
      title,
      rating,
      director,
      writers,
      actors,
      year,
      duration,
      country,
      genres,
      description,
      comments,
      controlsTypes,
      emojiList
    };

    this._element = null;
    this._onClose = null;
    this._onCloseButton = this._onCloseButton.bind(this);
  }

  get template() {
    return getFilmDetailsTemplate(this._filmDetalis);
  }

  get element() {
    return this._element;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind(element = null) {
    this._bindOnCloseButton(element === null ? this._element : element);
  }

  unbind(element = null) {
    this._unbindOnCloseButton(element === null ? this._element : element);
  }

  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }

  _bindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    buttonContainer.addEventListener(`click`, this._onCloseButton);
    buttonContainer.addEventListener(`keydown`, this._onCloseButton);
  }

  _unbindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    buttonContainer.removeEventListener(`click`, this._onCloseButton);
    buttonContainer.removeEventListener(`keydown`, this._onCloseButton);
  }

  _onCloseButton(evt) {
    if ((evt.keyCode !== KEYS.ESC)
      || (typeof this._onClose !== `function`)) {
      this._onClose();
    }
  }
}

export default FilmDetails;
