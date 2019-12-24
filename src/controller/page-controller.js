import ButtonShowMore from "../components/button-show-more";
import FilmList from "../components/film-list";
import Sort from "../components/sort";
import MainNavigation from "../components/main-navigation";
import TopRated from "../components/top-rated";
import {render, unrender, Position, generatorRandom, RandomValue, InstExtraFilm} from '../utils';
import MovieController from './movie-controller';


class PageController {
  constructor(container, film, count, stat, onDataChangeMain, api) {
    this._container = container;
    this._mainContainer = container.querySelector(`.main`);
    this._film = film;
    this._stat = stat;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = count;
    this._subscriptions = [];
    this._api = api;
    this._onDataChangeMain = onDataChangeMain;
  }
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  _onDataChange(popup, newData, container, oldData, isChangeCommentsList = false, commentId = false) {
    if (isChangeCommentsList) {
      this._onDataChangeComments(newData, oldData, commentId);
    } else {
      const currentIndexOfFilmCard = this._film.findIndex((it) => {
        return it === oldData;
      });
      const keysOfNewData = Object.keys(newData);
      keysOfNewData.forEach((key) => {
        this._film[currentIndexOfFilmCard][key] = newData[key];
      });
    }
    const filmId = oldData.id;
    const dataForSend = oldData;
    this._api.updateFilm(filmId, dataForSend)
      .then(() => {
        this._onDataChangeMain();
        if (popup) {
          popup.unDisabledRating();
        }
      });
    this.unrenderAll();
    this.render();
  }
  _onDataChangeComments(newData, oldData, commentId) {
    if (commentId) {
      const commentsListData = this._film[this._film.findIndex((it) => it === oldData)].comments;
      const indexInCards = this._film.findIndex((it) => it === oldData);
      const indexInCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      this._film[indexInCards].comments.splice(indexInCommentsList, 1);
    } else {
      newData.id = generatorRandom.generateRandomNumber(RandomValue.RANDOM_MIN, RandomValue.RANDOM_MAX);
      this._film[this._film.findIndex((it) => it === oldData)].comments.push(newData.id);
    }
  }

  addExtraFilm(topRated, mostComment) {
    const topRatingFilm = () => {
      let filsmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.totalRating) - parseFloat(filmSecond.totalRating)));
      filsmRating = filsmRating.slice(InstExtraFilm.BEGIN_PART, InstExtraFilm.END_PART);
      this.renderCard(topRated.takeContainer()[InstExtraFilm.LEFT_SIDE], filsmRating);
    };
    const topCommentFilm = () => {
      let filmsComment = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.comments.length) - parseFloat(filmSecond.comments.length)));
      filmsComment = filmsComment.slice(InstExtraFilm.BEGIN_PART, InstExtraFilm.END_PART);
      this.renderCard(mostComment.takeContainer()[InstExtraFilm.RIGHT_SIDE], filmsComment);
    };
    topCommentFilm();
    topRatingFilm();
  }
  addCountFilmFooter() {
    const totalsFilm = this._film.length;
    const footerStatistics = this._container.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalsFilm} movies inside`;
  }
  renderCard(containerCard, films) {
    const movieController = new MovieController(this._container, films, containerCard, this._count, this._onDataChange, this._onChangeView, this._api);
    movieController.render();
  }
  unrenderCard() {
    const filmCard = this._container.querySelectorAll(`.films-list .films-list__container .film-card`);
    filmCard.forEach((item) => unrender(item));
  }
  unrenderAll() {
    const mainContainer = this._container.querySelector(`.main`);
    mainContainer.innerHTML = ``;
  }
  render() {
    const beginCount = this._count;
    let totalFilm = this._film;
    let sortDef = totalFilm;
    let historyCount = 0;
    let watchlistCount = 0;
    let favorites = 0;
    for (let it of this._film) {
      if (it.controls.isMarkedAsWatched) {
        historyCount++;
      }
      if (it.controls.isAddedToWatchlist) {
        watchlistCount++;
      }
      if (it.controls.isFavorite) {
        favorites++;
      }
    }
    const menu = new MainNavigation(historyCount, watchlistCount, favorites);
    menu.showStat = () => {
      menu.addClassActiv();
      filmContainer.getElement().classList.add(`visually-hidden`);
      this._stat.getElement().classList.remove(`visually-hidden`);

    };
    menu.showAll = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._count = beginCount;
      this._film = totalFilm;
      sortDef = totalFilm;
      this.renderCard(filmCardContainer, totalFilm);
      if (this._film.length > TOTAL_LEN) {
        render(filmList, moreButton.getElement(), Position.BEFOREEND);
      }
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    };
    menu.showHistory = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._count = beginCount;
      sortDef = totalFilm.filter(function (it) {
        return it.controls.isMarkedAsWatched === true;
      });
      this._film = sortDef;
      this.renderCard(filmCardContainer, this._film);
      if (this._film.length > TOTAL_LEN) {
        render(filmList, moreButton.getElement(), Position.BEFOREEND);
      }
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    };
    menu.showWatchlist = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._count = beginCount;
      sortDef = totalFilm.filter(function (it) {
        return it.controls.isAddedToWatchlist === true;
      });
      this._film = sortDef;
      this.renderCard(filmCardContainer, this._film);
      if (this._film.length > TOTAL_LEN) {
        render(filmList, moreButton.getElement(), Position.BEFOREEND);
      }
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      render(filmList, sortFilm.getElement(sortDef), Position.AFTERBEGIN);
    };
    menu.showFavorites = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      this._count = beginCount;
      sortDef = totalFilm.filter(function (it) {
        return it.controls.isFavorite === true;
      });
      this._film = sortDef;
      this.renderCard(filmCardContainer, this._film);
      if (this._film.length > TOTAL_LEN) {
        render(filmList, moreButton.getElement(), Position.BEFOREEND);
      }
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    };
    render(this._mainContainer, menu.getElement(), Position.BEFOREEND);
    const filmContainer = new FilmList();
    render(this._mainContainer, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    const moreButton = new ButtonShowMore();
    const TOTAL_LEN = 5;

    moreButton.onButtonClick = () => {
      this._count += 5;
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      this.unrenderCard();

      this.renderCard(filmCardContainer, this._film);

    };

    if (this._film.length > TOTAL_LEN) {
      render(filmList, moreButton.getElement(), Position.BEFOREEND);
    }
    if (this._count >= this._film.length) {
      unrender(moreButton.getElement());
    }

    const sortFilm = new Sort();

    sortFilm.onSortRating = () => {
      this._film = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.totalRating) - parseFloat(filmSecond.totalRating)));
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
    };

    sortFilm.onSortDefault = () => {
      this._film = sortDef;
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
    };

    sortFilm.onSortdate = () => {
      this._film = [...this._film].sort((filmFirst, filmSecond) => (parseInt(filmFirst.year, 10) - parseInt(filmSecond.year, 10)));
      this.unrenderCard();
      this.renderCard(filmCardContainer, this._film);
    };

    render(filmList, sortFilm.getElement(), Position.AFTERBEGIN);
    const topRated = new TopRated();
    render(filmContainer.getElement(), topRated.getElement(), Position.BEFOREEND);
    const mostComment = new TopRated();
    render(filmContainer.getElement(), mostComment.getElement(), Position.BEFOREEND);
    mostComment.removetitle();

    this.renderCard(filmCardContainer, this._film);
    this.addExtraFilm(topRated, mostComment);
    this.addCountFilmFooter();
  }

}

export default PageController;

