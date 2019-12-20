import Profile from "./components/profile";
import Search from "./components/search";
import Statistic from './components/statistic.js';
import PageController from "./controller/page-controller.js";
import SearchControlLer from './controller/search-controller';
import StatsController from "./controller/statistic-controller";
import NoFilmCard from "./components/no-films";
import API from "./api";
import {render, unrender, Position, AUTHORIZATION, END_POINT} from './utils';
import {generateRank} from './data.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);
const loading = new NoFilmCard(`Loading`);
render(mainContainer, loading.getElement(), Position.BEFOREEND);
const titleUser = generateRank();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
let count = 5;
const search = new Search();

const startApp = (films) => {
  const stat = new Statistic(titleUser, films);
  unrender(loading.getElement());
  loading.removeElement();
  const page = new PageController(bodyContainer, films, count, stat, onDataChangeMain);
  const statsController = new StatsController(mainContainer, films, stat);
  statsController.render();
  page.render();
  const searchControl = new SearchControlLer(headerContainer, films, search, page, mainContainer);
  searchControl.render();
  render(headerContainer, new Profile(titleUser).getElement(), Position.BEFOREEND);
};
const onDataChangeMain = (actionType, update) => {
  switch (actionType) {
    case `update`:
      api.updateFilm(({
        id: update.id,
        data: update.data.toRAW()
      })
        .then(() => api.getFilms())
        .then((films) => {
          startApp(films);
        }));
      break;
  }
};


api.getFilms()
  .then((films) => {
    startApp(films);
  });

