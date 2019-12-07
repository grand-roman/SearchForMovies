import {getProfileTemplate} from './profile-template.js';
import {createElement} from '../utils.js';

class Profile {

  constructor(userRating) {
    this._userRating = userRating;
    this._element = null;
  }

  get template() {
    return getProfileTemplate(this._userRating);
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

export default Profile;
