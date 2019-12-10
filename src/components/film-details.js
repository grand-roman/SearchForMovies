
import {getFilmDetailsTemplate} from './film-details-template.js';
import {KEYS} from '../utils.js';
import AbstractComponent from './abstract-component.js';

class FilmDetails extends AbstractComponent {

  constructor(filmDetalis, controlsTypes, emojiList) {

    super();
    let {img, age, title, rating, director, writers,
      actors, year, duration, country, genres, description, comments} = filmDetalis;

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

    this._onClose = null;
    this._onCloseButton = this._onCloseButton.bind(this);
  }

  get template() {
    return getFilmDetailsTemplate(this._filmDetalis);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  bind(element = null) {
    this._bindOnCloseButton(element === null ? this._element : element);
  }

  unbind(element = null) {
    this._unbindOnCloseButton(element === null ? this._element : element);
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
