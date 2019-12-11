import ButtonShowMore from '../components/button-show-more.js';
import FilmCard from '../components/film-card.js';
import NoFilmCard from "../components/no-films";
import FilmDetails from '../components/film-details.js';
import FilmList from '../components/film-list.js';
import {addElementDOM} from '../utils.js';

class PageController {

  constructor(films, filmsDetails) {
    this._films = films;
    this._filmsDetails = filmsDetails;
    this._totalFilmPortionNumber = 1;
  }

  render(filmDetails) {
    let {
      controlsTypes,
      emojiList,
      filmLists,
      filmsCards,
      filmsCategoriesId,
      getFilmsCardsPortion} = filmDetails;

    let filmCardDetails = {
      controlsTypes,
      emojiList,
      filmLists,
      filmsCards,
      getFilmsCardsPortion
    };

    if (filmsCards.length === 0) {
      const noFilmsListComponent = new NoFilmCard();
      addElementDOM(this._films, noFilmsListComponent);
    } else {
      this._addFilmList(filmsCategoriesId.AllMoviesUpcoming, filmCardDetails);
      this._addFilmList(filmsCategoriesId.TopRated, filmCardDetails);
      this._addFilmList(filmsCategoriesId.MostCommented, filmCardDetails);
    }
  }

  _addFilmList(filmCategory, filmCardDetails) {

    let {
      controlsTypes,
      emojiList,
      filmLists,
      filmsCards,
      getFilmsCardsPortion} = filmCardDetails;


    const filmsListComponent = new FilmList(filmLists[filmCategory]);
    addElementDOM(this._films, filmsListComponent);

    const filmsListElement = filmsListComponent.element;
    const filmsListContainer = this._getFilmsListContainer(filmsListElement);
    const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);
    let addFilmDetails = {
      filmCategory,
      filmsListContainer,
      filmsListFilmsContainer,
      filmsCards,
      controlsTypes,
      emojiList,
      getFilmsCardsPortion
    };
    this._addFilmsCards(addFilmDetails);

    if (filmsListElement.firstElementChild.dataset.isbutton) {
      this._createButtonShowMore(filmsListContainer, getFilmsCardsPortion);
    }
  }

  _addFilmCard(addOneFilmCard) {
    let {
      filmsListContainer,
      filmsListFilmsContainer,
      filmCard,
      controlsTypes,
      emojiList} = addOneFilmCard;
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

  _addFilmsCards(addFilmDetails) {
    let {
      filmCategory,
      filmsListContainer,
      filmsListFilmsContainer,
      filmsCards,
      controlsTypes,
      emojiList,
      getFilmsCardsPortion} = addFilmDetails;

    const filmsCardsPortion = filmCategory === filmCategory.AllMoviesUpcoming
      ? getFilmsCardsPortion() : filmsCards;
    filmsCardsPortion.forEach((filmCard) => {
      let addOneFilmCard = {
        filmsListContainer,
        filmsListFilmsContainer,
        filmCard,
        controlsTypes,
        emojiList
      };
      this._addFilmCard(addOneFilmCard);
    });
  }

  _addMoreCards(getFilmsCardsPortion) {
    const filmsCardsPortion = getFilmsCardsPortion();
    this._totalFilmPortionNumber += 1;
    filmsCardsPortion.forEach((filmCardPortion) => {
      const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }

  _createButtonShowMore(filmsListContainer, getFilmsCardsPortion) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElementDOM(filmsListContainer, buttonShowMoreComponent);

    buttonShowMoreComponent.onOpen = () => {
      this._addMoreCards(getFilmsCardsPortion);
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
