import {getProfileTemplate} from './profile-template.js';
import AbstractComponent from './abstract-component.js';

class Profile extends AbstractComponent {

  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  get template() {
    return getProfileTemplate(this._userRating);
  }

}

export default Profile;
