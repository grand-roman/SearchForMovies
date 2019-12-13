
import MainNavigation from "./components/main-navigation";
import Profile from "./components/profile";
import Search from "./components/search";
import PageController from "./controller/page-controller.js";
import {render, Position} from './utils.js';
import {
  historyCount,
  watchlistCount,
  favorites,
  generateRank,
  generateFilmData as filmData} from './data.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const page = new PageController(mainContainer, filmData);

render(headerContainer, new Search().getElement(), Position.BEFOREEND);
render(headerContainer, new Profile(generateRank()).getElement(), Position.BEFOREEND);
render(mainContainer, new MainNavigation(historyCount, watchlistCount, favorites).getElement(), Position.BEFOREEND);
page.render();
