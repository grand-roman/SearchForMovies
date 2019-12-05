import {getButtonShowMoreTemplate} from './button-show-more-template.js';
import {KEYS, createElement} from '../utils.js';

class ButtonShowMore {

  constructor() {
    this._element = null;
    this._onOpen = null;
    this._onOpenButton = this._onOpenButton.bind(this);
  }

  get template() {
    return getButtonShowMoreTemplate();
  }

  get element() {
    return this._element;
  }

  set onOpen(fn) {
    this._onOpen = fn;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind(element = null) {
    this._bindOnOpenButton(element === null ? this._element : element);
  }

  unbind(element = null) {
    this._unbindOnOpenButton(element === null ? this._element : element);
  }

  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }

  _bindOnOpenButton(element) {
    element.firstElementChild.addEventListener(`click`, this._onOpenButton);
    element.firstElementChild.addEventListener(`keydown`, this._onOpenButton);
  }

  _unbindOnOpenButton(element) {
    element.firstElementChild.removeEventListener(`click`, this._onOpenButton);
    element.firstElementChild.removeEventListener(`keydown`, this._onOpenButton);
  }

  _onOpenButton(evt) {
    if ((evt.keyCode !== KEYS.ENTER)
      || (typeof this._onClose !== `function`)) {
      this._onOpen();
    }
  }
}

export default ButtonShowMore;
