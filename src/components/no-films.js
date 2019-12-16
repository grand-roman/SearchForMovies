import AbstractComponent from "./abstract-component";

class NoFilmCard extends AbstractComponent {

  getTemplate() {
    return `<main class="main">
  <div class="result">
    <p class="result__text">Result <span class="result__count">0</span></p>
  </div>

  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">There are no movies in our database</h2>

    </section>
    </section>
</main>`;
  }
}
export default NoFilmCard;
