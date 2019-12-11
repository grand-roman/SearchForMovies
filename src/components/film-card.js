import {getFilmCardTemplate} from './film-card-template.js';
import {KEYS} from '../utils.js';
import AbstractComponent from './abstract-component.js';

class FilmCard extends AbstractComponent {

  constructor(filmCard) {

    super();
    let {title, rating, year, duration, genres, img,
      description, countComments} = filmCard;

    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._img = img;
    this._description = description;
    this._countComments = countComments;

    this._onOpen = null;
    this._onOpenDetails = this._onOpenDetails.bind(this);
  }

  get template() {
    return getFilmCardTemplate(
        this._title,
        this._rating,
        this._year,
        this._duration,
        this._genres,
        this._img,
        this._description,
        this._countComments
    );
  }

  _bindOnOpenDetails(element) {
    element.firstElementChild.addEventListener(`click`, this._onOpenDetails);
    element.firstElementChild.addEventListener(`keydown`, this._onOpenDetails);
  }

  _unbindOnOpenDetails(element) {
    element.firstElementChild.removeEventListener(`click`, this._onOpenDetails);
    element.firstElementChild.removeEventListener(`keydown`, this._onOpenDetails);
  }

  _onOpenDetails(evt) {
    if ((evt.keyCode !== KEYS.ENTER)
      || (typeof this._onOpen !== `function`)) {
      this._onOpen();
    }
  }
}

export default FilmCard;
