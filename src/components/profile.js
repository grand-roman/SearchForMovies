import AbstractComponent from "./abstract-component";

class Profile extends AbstractComponent {
  constructor(title) {
    super();
    this._titleUser = title;
  }
  getTemplate() {
    return `<section class="header__profile profile">
        <p class="profile__rating">${this._titleUser}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
export default Profile;
