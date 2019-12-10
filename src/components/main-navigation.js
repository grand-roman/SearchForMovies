import {getMainNavigationTemplate} from './main-navigation-template.js';
import AbstractComponent from './abstract-component.js';

class MainNavigation extends AbstractComponent {

  constructor(menuTypes) {
    super();
    this._menuTypes = menuTypes;
  }

  get template() {
    return getMainNavigationTemplate(this._menuTypes);
  }

}

export default MainNavigation;
