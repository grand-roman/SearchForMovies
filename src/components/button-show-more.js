import AbstractComponent from "./abstract-component";

class ButtonShowMore extends AbstractComponent {

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
  bind() {
    this._element.addEventListener(`click`, this.onButtonClick);
  }
  onButtonClick() {

  }
}
export default ButtonShowMore;
