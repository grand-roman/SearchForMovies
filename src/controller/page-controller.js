import ButtonShowMore from "../components/button-show-more";
import FilmList from "../components/film-list";
import Sort from "../components/sort";
import MainNavigation from "../components/main-navigation";
import TopRated from "../components/top-rated";
import {render, unrender, Position, AUTHORIZATION, END_POINT, generatorRandom} from '../utils';
import MovieController from './movie-controller';
import API from "../api";


class PageController {
  constructor(container, film, count, stat, onDataChangeMain) {
    this._container = container;
    this._mainContainer = container.querySelector(`.main`);
    this._film = film;
    this._stat = stat;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = count;
    this._subscriptions = [];
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
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
  }
  _onDataChangeComments(newData, oldData, commentId) {
    if (commentId) {
      const commentsListData = this._film[this._film.findIndex((it) => it === oldData)].comments;
      const indexInCards = this._film.findIndex((it) => it === oldData);
      const indexInCommentsList = commentsListData.findIndex((comment) => comment.id === commentId);
      this._film[indexInCards].comments.splice(indexInCommentsList, 1);
    } else {
      newData.id = generatorRandom.generateRandomNumber(1000, 9999);
      this._film[this._film.findIndex((it) => it === oldData)].comments.push(newData.id);
    }
  }

  addExtraFilm(topRated, mostComment) {
    const topRatingFilm = () => {
      let filsmRating = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.totalRating) - parseFloat(filmSecond.totalRating)));
      filsmRating = filsmRating.slice(0, 2);
      this.renderCard(topRated.takeContainer()[0], filsmRating);
    };
    const topCommentFilm = () => {
      let filmsComment = [...this._film].sort((filmSecond, filmFirst) => (parseFloat(filmFirst.comments.length) - parseFloat(filmSecond.comments.length)));
      filmsComment = filmsComment.slice(0, 2);
      this.renderCard(mostComment.takeContainer()[1], filmsComment);
    };
    topCommentFilm();
    topRatingFilm();
  }
  addCountFilmFooter() {
    const totalFilm = this._film.length;
    const footerStatistics = this._container.querySelector(`.footer__statistics`);
    footerStatistics.textContent = `${totalFilm} movies inside`;
  }
  renderCard(containerCard, films) {
    const movieController = new MovieController(this._container, films, containerCard, this._count, this._onDataChange, this._onChangeView);
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
    let totalFilm = this._film;
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
      this.renderCard(filmCardContainer, totalFilm);
    };
    menu.showHistory = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsWatched = totalFilm.filter(function (it) {
        return it.controls.isMarkedAsWatched === true;
      });
      this.renderCard(filmCardContainer, filmsWatched);
    };
    menu.showWatchlist = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsWatchList = totalFilm.filter(function (it) {
        return it.controls.isAddedToWatchlist === true;
      });
      this.renderCard(filmCardContainer, filmsWatchList);
    };
    menu.showFavorites = () => {
      menu.addClassActiv();
      if (filmContainer.getElement().classList.contains(`visually-hidden`)) {
        filmContainer.getElement().classList.remove(`visually-hidden`);
      }
      this._stat.getElement().classList.add(`visually-hidden`);
      this.unrenderCard();
      const filmsFavor = totalFilm.filter(function (it) {
        return it.controls.isFavorite === true;
      });
      this.renderCard(filmCardContainer, filmsFavor);
    };
    render(this._mainContainer, menu.getElement(), Position.BEFOREEND);
    const filmContainer = new FilmList();
    render(this._mainContainer, filmContainer.getElement(), Position.BEFOREEND);
    const filmList = filmContainer.getChildren()[0];
    const filmCardContainer = filmList.querySelector(`.films-list__container`);
    const moreButton = new ButtonShowMore();

    moreButton.onButtonClick = () => {
      this._count += 5;
      if (this._count >= this._film.length) {
        unrender(moreButton.getElement());
      }
      this.unrenderCard();

      this.renderCard(filmCardContainer, this._film);

    };
    render(filmList, moreButton.getElement(), Position.BEFOREEND);
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
      this.unrenderCard();
      this._film = totalFilm;
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

