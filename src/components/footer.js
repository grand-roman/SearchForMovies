import AbstractComponent from "./abstract-component";

class Footer extends AbstractComponent {
  constructor(data) {
    super();
    this._countFilmCards = data;
  }
  getTemplate() {
    return `<section class="footer__statistics">
        <p>${this._countFilmCards} movies inside</p>
      </section>`;
  }

}
export default Footer;
