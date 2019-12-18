import Profile from "./components/profile";
import Search from "./components/search";
import Statistic from './components/statistic.js';
import PageController from "./controller/page-controller.js";
import SearchControlLer from './controller/search-controller';
import {render, Position} from './utils.js';
import {generateRank, arrFilm as filmData} from './data.js';

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const bodyContainer = document.querySelector(`body`);
let count = 5;
const stat = new Statistic();
const search = new Search();
render(headerContainer, stat.getElement(), Position.BEFOREEND);

const page = new PageController(bodyContainer, filmData, count, stat);

page.render();
const searchControl = new SearchControlLer(headerContainer, filmData, search, page);

searchControl.init();
render(headerContainer, new Profile(generateRank()).getElement(), Position.BEFOREEND);

render(mainContainer, stat.getElement(), Position.BEFOREEND);
