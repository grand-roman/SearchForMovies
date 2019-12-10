import ButtonShowMore from '../components/button-show-more.js';
import FilmCard from '../components/film-card.js';
import NoFilmCard from "../components/no-films";
import FilmDetails from '../components/film-details.js';
import FilmList from '../components/film-list.js';
import {
  controlsTypes,
  emojiList,
  filmLists,
  filmsCards,
  filmsCategoriesId,
  getFilmsCardsPortion
} from '../data.js';
import {addElementDOM} from '../utils.js';

class PageController {

  constructor(films, filmsDetails) {
    this._films = films;
    this._filmsDetails = filmsDetails;
    this._totalFilmPortionNumber = 1;
    this._getFilmsCards = getFilmsCardsPortion();
  }

  init() {
    if (filmsCards.length === 0) {
      const noFilmsListComponent = new NoFilmCard();
      addElementDOM(this._films, noFilmsListComponent);
    } else {
      this._addFilmList(filmsCategoriesId.AllMoviesUpcoming);
      this._addFilmList(filmsCategoriesId.TopRated);
      this._addFilmList(filmsCategoriesId.MostCommented);
    }
  }

  _addFilmList(filmCategory) {
    const filmsListComponent = new FilmList(filmLists[filmCategory]);
    addElementDOM(this._films, filmsListComponent);

    const filmsListElement = filmsListComponent.element;
    const filmsListContainer = this._getFilmsListContainer(filmsListElement);
    const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);

    this._addFilmsCards(filmCategory, filmsListContainer, filmsListFilmsContainer);

    if (filmsListElement.firstElementChild.dataset.isbutton) {
      this._createButtonShowMore(filmsListContainer);
    }
  }

  _addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard) {
    const filmCardComponent = new FilmCard(filmCard);
    const filmDetailsComponent = new FilmDetails(filmCard, controlsTypes, emojiList);

    filmCard.categoriesId.forEach((category) => {
      if (filmsListContainer.dataset.id === category) {
        addElementDOM(filmsListFilmsContainer, filmCardComponent);
      }
    });

    filmCardComponent.onOpen = () => {
      this._filmsDetails.classList.remove(`visually-hidden`);
      addElementDOM(this._filmsDetails, filmDetailsComponent);
    };

    filmDetailsComponent.onClose = () => {
      this._filmsDetails.classList.add(`visually-hidden`);
      this._filmsDetails.firstElementChild.remove();
      filmDetailsComponent.unrender();
    };
  }

  _addFilmsCards(filmCategory, filmsListContainer, filmsListFilmsContainer) {
    const filmsCardsPortion = filmCategory === filmsCategoriesId.AllMoviesUpcoming
      ? this._getFilmsCards() : filmsCards;
    filmsCardsPortion.forEach((filmCard) => {
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
    });
  }

  _addMoreCards() {
    const filmsCardsPortion = this._getFilmsCards();
    this._totalFilmPortionNumber += 1;
    filmsCardsPortion.forEach((filmCardPortion) => {
      const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }

  _createButtonShowMore(filmsListContainer) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElementDOM(filmsListContainer, buttonShowMoreComponent);

    buttonShowMoreComponent.onOpen = () => {
      this._addMoreCards();
      if (this._totalFilmPortionNumber === 3) {
        document.querySelector(`.films-list__show-more`).remove();
        buttonShowMoreComponent.unrender();
      }
    };
  }

  _getFilmsListContainer(filmsListElement) {
    return document.getElementById(filmsListElement.firstElementChild.dataset.id);
  }

  _getFilmsListFilmsContainer(filmsListContainer) {
    return filmsListContainer.querySelector(`.films-list__container`);
  }
}

export default PageController;
