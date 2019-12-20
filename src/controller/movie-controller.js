import FilmDetails from "../components/film-details";
import {AUTHORIZATION, END_POINT, isEscPressed, Position, render, unrender} from "../utils";
import FilmCard from "../components/film-card";
import CommentsController from "./comment-controller";
import API from "../api";

class MovieController {
  constructor(bodyContainer, films, containerCard, count, onDataChange, onChangeView) {
    this._bodyContainer = bodyContainer;
    this._film = films;
    this._count = count;
    this._containerCard = containerCard;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
  }

  openPopup(popup) {
    this._onChangeView();
    render(this._bodyContainer, popup.getElement(), Position.BEFOREEND);
    this._bodyContainer.classList.add(`hide-overflow`);
    const onCloseBtnClick = (evtClose) => {
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        MovieController.closePopup(popup, this._bodyContainer);
        this._bodyContainer.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        MovieController.closePopup(popup, this._bodyContainer);
        this._bodyContainer.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    this._bodyContainer.addEventListener(`keydown`, onEscKeydown);
    const commentAdd = popup.getElement().querySelector(`.film-details__comment-input`);
    commentAdd.addEventListener(`focus`, function () {
      commentAdd.removeEventListener(`keydown`, onEscKeydown);
    });
    commentAdd.addEventListener(`blur`, function () {
      commentAdd.addEventListener(`keydown`, onEscKeydown);
    });
  }
  static closePopup(popup, bodyContainer) {
    unrender(popup.getElement());
    popup.removeElement();
    bodyContainer.classList.remove(`hide-overflow`);
  }

  setDefaultView(popup) {
    if (this._bodyContainer.contains(popup.getElement())) {
      unrender(popup.getElement());
      popup.removeElement();
    }
  }
  init() {
    const totalFilmSlice = this._film.slice(0, this._count);
    const filmToggle = (evt, popup, film) => {
      popup.changePopUp = () => {
        getNewMokData(``, popup, film);
      };
      popup.onCloseButtonPress = () =>{
        getNewMokData(`watched`, popup, film);
        popup.getElement().querySelector(`#watched`).checked = false;
      };
      popup.onRatingScorePress = (evtRate) => {
        popup.getElement().querySelector(`.film-details__user-rating`).textContent = `Your rate ${evtRate.target.value}`;
        getNewMokData(``, popup, film);
      };
      this.setDefaultView(popup);
      const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
      if (togglers.some((cls) => evt.target.classList.contains(cls))) {
        this.openPopup(popup);
      }
    };
    let film = {};
    let popup = {};

    for (let i = 0; i < totalFilmSlice.length; i++) {

      film = new FilmCard(this._film[i]);
      film.onMarkAsWatchedClick = (evt) => {
        evt.preventDefault();
        this._api.getComments(this._film[i].id).then((comments) => {

          popup = new FilmDetails(this._film[i], comments);
          const commentsController = new CommentsController(popup.getElement(), this._film[i], this._onDataChange, comments);
          commentsController.init();
          getNewMokData(`watched`, popup, this._film[i]);
        });
      };
      film.onFavoriteClick = (evt) => {
        evt.preventDefault();
        this._api.getComments(this._film[i].id).then((comments) => {

          popup = new FilmDetails(this._film[i], comments);
          const commentsController = new CommentsController(popup.getElement(), this._film[i], this._onDataChange, comments);
          commentsController.init();
          getNewMokData(`favorite`, popup, this._film[i]);
        });
      };
      film.onAddToWatchlistClick = (evt) => {
        evt.preventDefault();
        this._api.getComments(this._film[i].id).then((comments) => {

          popup = new FilmDetails(this._film[i], comments);
          const commentsController = new CommentsController(popup.getElement(), this._film[i], this._onDataChange, comments);
          commentsController.init();
          getNewMokData(`watchlist`, popup, this._film[i]);
        });
      };

      film.onToggleFilm = (evt) => {
        this._api.getComments(this._film[i].id).then((comments) => {
          popup = new FilmDetails(this._film[i], comments);
          const commentsController = new CommentsController(popup.getElement(), this._film[i], this._onDataChange, comments);
          commentsController.init();
          filmToggle(evt, popup, this._film[i]);
        });
      };
      render(this._containerCard, film.getElement(), Position.BEFOREEND);
    }
    const getNewMokData = (nameOfList, popups, oldData) => {
      const formData = new FormData(popups.getElement().querySelector(`.film-details__inner`));
      const switchTrueFalse = (v) => !v;
      const personalRating = formData.getAll(`score`);
      const entry = {
        controls: {
          isFavorite: Boolean(formData.get(`favorite`)),
          isAddedToWatchlist: Boolean(formData.get(`watchlist`)),
          isMarkedAsWatched: Boolean(formData.get(`watched`)),
        },
        personalRating: `${personalRating}`,

      };
      switch (nameOfList) {
        case `favorite`:
          entry.controls.isFavorite = switchTrueFalse(entry.controls.isFavorite);
          break;
        case `watchlist`:
          entry.controls.isAddedToWatchlist = switchTrueFalse(entry.controls.isAddedToWatchlist);
          break;
        case `watched`:
          entry.controls.isMarkedAsWatched = switchTrueFalse(entry.controls.isMarkedAsWatched);
          break;
      }
      if (entry.controls.isMarkedAsWatched) {
        popups.getElement().querySelector(`.film-details__user-rating-wrap `).classList.remove(`visually-hidden`);
        popups.getElement().querySelector(`.film-details__user-rating `).classList.remove(`visually-hidden`);
      } else {
        popups.getElement().querySelector(`.film-details__user-rating-wrap `).classList.add(`visually-hidden`);
        popups.getElement().querySelector(`.film-details__user-rating `).classList.add(`visually-hidden`);
        entry.personalRating = ``;
      }
      this._onDataChange(popups, entry, this._containerCard, oldData);
    };
  }
}
export default MovieController;
