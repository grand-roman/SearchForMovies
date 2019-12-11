import {getStatisticTemplate} from './statistic-template.js';
import AbstractComponent from './abstract-component.js';

class Statistic extends AbstractComponent {

  constructor(userRating, filters, textList) {
    super();
    this._userRating = userRating;
    this._filters = filters;
    this._textList = textList;

    this._element = null;
  }

  get template() {
    return getStatisticTemplate(
        this._userRating,
        this._filters,
        this._textList);
  }

}

export default Statistic;
