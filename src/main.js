import Footer from './components/footer.js';
import MainNavigation from './components/main-navigation.js';
import Profile from './components/profile.js';
import Search from './components/search.js';
import Sort from './components/sort.js';
import PageController from "./controller/page-controller";
import {addElementDOM} from './utils.js';
import {
  sortTypes,
  menuTypes,
  countFilmCards,
  userRating,
  controlsTypes,
  emojiList,
  filmLists,
  filmsCards,
  filmsCategoriesId,
  getFilmsCardsPortion
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

const searchComponent = new Search();
addElementDOM(search, searchComponent);

const profileComponent = new Profile(userRating);
addElementDOM(profile, profileComponent);

const mainNavigationComponent = new MainNavigation(menuTypes);
addElementDOM(mainNavigation, mainNavigationComponent);

const sortComponent = new Sort(sortTypes);
addElementDOM(sort, sortComponent);

const pageControllerComponent = new PageController(films, filmsDetails);

pageControllerComponent.render({
  controlsTypes,
  emojiList,
  filmLists,
  filmsCards,
  filmsCategoriesId,
  getFilmsCardsPortion});

const footerComponent = new Footer(countFilmCards);
addElementDOM(footer, footerComponent);
