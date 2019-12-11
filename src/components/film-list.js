import {getFilmsListTemplate} from './film-list-template.js';
import AbstractComponent from './abstract-component.js';

class FilmList extends AbstractComponent {

  constructor({isExtra, isVisuallyHidden, title, films,
    isButton, id}) {

    super();
    this._isExtra = isExtra;
    this._isVisuallyHidden = isVisuallyHidden;
    this._title = title;
    this._films = films;
    this._isButton = isButton;
    this._id = id;

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

}

export default FilmList;
