import ButtonShowMore from './components/button-show-more.js';
import FilmCard from './components/film-card.js';
import NoFilmCard from "./components/no-films";
import FilmDetails from './components/film-details.js';
import FilmList from './components/film-list.js';
import Footer from './components/footer.js';
import MainNavigation from './components/main-navigation.js';
import Profile from './components/profile.js';
import Search from './components/search.js';
import Sort from './components/sort.js';
import {addElementDOM} from './utils.js';
import {
  sortTypes,
  controlsTypes,
  emojiList,
  filmLists,
  menuTypes,
  filmsCards,
  countFilmCards,
  userRating,
  filmsCategoriesId,
  getFilmsCardsPortion,
} from './data.js';

let totalFilmPortionNumber = 1;
const getFilmsCards = getFilmsCardsPortion();

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const search = header.querySelector(`.search`);
const profile = header.querySelector(`.profile`);
const main = body.querySelector(`.main`);
const mainNavigation = main.querySelector(`.main-navigation`);
const sort = main.querySelector(`.sort`);
const films = main.querySelector(`.films`);
const filmsDetails = body.querySelector(`.film-details`);
const footer = body.querySelector(`.footer`);

const searchComponent = new Search();
addElementDOM(search, searchComponent);

const profileComponent = new Profile(userRating);
addElementDOM(profile, profileComponent);

const mainNavigationComponent = new MainNavigation(menuTypes);
addElementDOM(mainNavigation, mainNavigationComponent);

const sortComponent = new Sort(sortTypes);
addElementDOM(sort, sortComponent);

const addFilmCard = (filmsListContainer, filmsListFilmsContainer,
    filmCard) => {
  const filmCardComponent = new FilmCard(filmCard);
  const filmDetailsComponent = new FilmDetails(filmCard, controlsTypes,
      emojiList);

  filmCard.categoriesId.forEach((category) => {
    if (filmsListContainer.dataset.id === category) {
      addElementDOM(filmsListFilmsContainer, filmCardComponent);
    }
  });

  filmCardComponent.onOpen = () => {
    filmsDetails.classList.remove(`visually-hidden`);
    addElementDOM(filmsDetails, filmDetailsComponent);
  };

  filmDetailsComponent.onClose = () => {
    filmsDetails.classList.add(`visually-hidden`);
    filmsDetails.firstElementChild.remove();
    filmDetailsComponent.unrender();
  };
};

const addFilmsCards = (filmCategory, filmsListContainer,
    filmsListFilmsContainer) => {
  const filmsCardsPortion = filmCategory === filmsCategoriesId.AllMoviesUpcoming
    ? getFilmsCards() : filmsCards;
  filmsCardsPortion.forEach((filmCard) => {
    addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
  });
};

const addMoreCards = () => {
  const filmsCardsPortion = getFilmsCards();
  totalFilmPortionNumber += 1;
  filmsCardsPortion.forEach((filmCardPortion) => {
    const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
    const filmsListFilmsContainer =
      filmsListContainer.querySelector(`.films-list__container`);
    addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
  });
};

const createButtonShowMore = (filmsListContainer) => {
  const buttonShowMoreComponent = new ButtonShowMore();
  addElementDOM(filmsListContainer, buttonShowMoreComponent);

  buttonShowMoreComponent.onOpen = () => {
    addMoreCards();
    if (totalFilmPortionNumber === 3) {
      document.querySelector(`.films-list__show-more`).remove();
      buttonShowMoreComponent.unrender();
    }
  };
};

const getFilmsListContainer = (filmsListElement) => {
  return document.getElementById(filmsListElement.firstElementChild.dataset.id);
};

const getFilmsListFilmsContainer = (filmsListContainer) => {
  return filmsListContainer.querySelector(`.films-list__container`);
};

const addFilmList = (filmCategory) => {
  const filmsListComponent = new FilmList(filmLists[filmCategory]);
  addElementDOM(films, filmsListComponent);

  const filmsListElement = filmsListComponent.element;
  const filmsListContainer = getFilmsListContainer(filmsListElement);
  const filmsListFilmsContainer = getFilmsListFilmsContainer(filmsListContainer);

  addFilmsCards(filmCategory, filmsListContainer, filmsListFilmsContainer);

  if (filmsListElement.firstElementChild.dataset.isbutton) {
    createButtonShowMore(filmsListContainer);
  }
};

if (filmsCards.length === 0) {
  const noFilmsListComponent = new NoFilmCard();
  addElementDOM(films, noFilmsListComponent);
} else {
  addFilmList(filmsCategoriesId.AllMoviesUpcoming);
  addFilmList(filmsCategoriesId.TopRated);
  addFilmList(filmsCategoriesId.MostCommented);
}

const footerComponent = new Footer(countFilmCards);
addElementDOM(footer, footerComponent);
