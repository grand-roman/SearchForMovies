import {getSearchTemplate} from './components/search-template.js';
import {getProfileTemplate} from './components/profile-template.js';
import {getMainNavigationTemplate} from './components/main-navigation-template.js';
import {getSortTemplate} from './components/sort-template.js';
import {getFilmsListTemplate} from './components/film-list-template.js';
import {getFilmCardTemplate} from './components/film-card-template.js';
import {getFilmDetailsTemplate} from './components/film-details-template.js';
import {getFooterTemplate} from './components/footer-template.js';
import {render} from './utils.js';
import {
  sortTypes,
  controlsTypes,
  emojiList,
  menuTypes,
  filmTitles,
  filmCards,
  countFilmCards,
  randomFilmCard,
  userRating
} from './data.js';

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


const addFilmsCards = () => {
  const filmsCards = films.querySelectorAll(`.film-card`);
  filmsCards.forEach((filmsCard) => {
    filmsCard.addEventListener(`click`, () => {
      filmsDetails.classList.remove(`visually-hidden`);
    });
  });
};

render(filmsDetails, getFilmDetailsTemplate(randomFilmCard, controlsTypes, emojiList));
const filmDetailsCloseBtn = filmsDetails.querySelector(`.film-details__close-btn`);
filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmsDetails.classList.add(`visually-hidden`);
});

render(search, getSearchTemplate());
render(profile, getProfileTemplate(userRating));
render(mainNavigation, getMainNavigationTemplate(menuTypes));

render(sort, getSortTemplate(sortTypes));

filmTitles.forEach((filmTitle) => {
  render(films, getFilmsListTemplate(filmTitle));
});

addFilmsCards();

const filmsListContainer = films.querySelector(`.films-list`)
  .querySelector(`.films-list__container`);
const filmsListShowMore = films.querySelector(`.films-list__show-more`);


const addMoreCards = () => {
  filmCards.slice(5, 10).forEach((filmCard) => {
    render(filmsListContainer, getFilmCardTemplate(filmCard));
  });
  filmsListShowMore.classList.add(`visually-hidden`);
  filmsListShowMore.removeEventListener(`click`, addMoreCards);
};

filmsListShowMore.addEventListener(`click`, addMoreCards);
render(footer, getFooterTemplate(countFilmCards));
