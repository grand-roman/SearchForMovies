import AbstractComponent from './abstract-component.js';

const getNoFilmCardTemplate = () => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`);
};

class NoFilmCard extends AbstractComponent {

  constructor() {
    super();
  }

  get template() {
    return getNoFilmCardTemplate();
  }

}
export default NoFilmCard;
