import {getFooterTemplate} from './footer-template.js';
import AbstractComponent from './abstract-component.js';

class Footer extends AbstractComponent {

  constructor(countFilmCards) {
    super();
    this._countFilmCards = countFilmCards;
  }

  get template() {
    return getFooterTemplate(this._countFilmCards);
  }

}

export default Footer;
