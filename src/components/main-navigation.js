import {getMainNavigationTemplate} from './main-navigation-template.js';
import {createElement} from '../utils.js';

class MainNavigation {

  constructor(menuTypes) {
    this._menuTypes = menuTypes;
    this._element = null;
  }

  get template() {
    return getMainNavigationTemplate(this._menuTypes);
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  unrender() {
    this._element = null;
  }

  bind() {}

  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }
}

export default MainNavigation;
