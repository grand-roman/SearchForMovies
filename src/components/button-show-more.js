import {getButtonShowMoreTemplate} from './button-show-more-template.js';
import {KEYS} from '../utils.js';
import AbstractComponent from './abstract-component.js';

class ButtonShowMore extends AbstractComponent {

  constructor() {
    super();
    this._onOpen = null;
    this._onOpenButton = this._onOpenButton.bind(this);
  }

  get template() {
    return getButtonShowMoreTemplate();
  }

  set onOpen(fn) {
    this._onOpen = fn;
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
      || (typeof this._onOpen !== `function`)) {
      this._onOpen();
    }
  }
}

export default ButtonShowMore;
