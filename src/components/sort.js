import {getSortTemplate} from './sort-template.js';
import AbstractComponent from './abstract-component.js';

class Sort extends AbstractComponent {

  constructor(sortType) {
    super();
    this._sortType = sortType;
  }

  get template() {
    return getSortTemplate(this._sortType);
  }

}

export default Sort;
