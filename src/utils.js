export const KeyCode = {
  ENTER: 13,
  CONTROL: 17,
  ENTERSTRING: `Enter`,
  CONTROLSTRING: `Control`,
};
export const generatorRandom = {
  generateRandomNumber(min, max) {
    return (min + Math.random() * (max - min)).toFixed(1);
  },
};

export const RandomValue = {
  RANDOM_MIN: 1000,
  RANDOM_MAX: 9999
};

export const InstExtraFilm = {
  LEFT_SIDE: 0,
  RIGHT_SIDE: 1,
  BEGIN_PART: 0,
  END_PART: 2
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const SHORT_DESCRIPTION = 139;
export const SIZE_PRESSED_KEY = 2;

export const AUTHORIZATION = `Basic eo0w590ik29889a`;
export const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
export const isEscPressed = (key) => {
  return key === `Escape` || key === `Esc`;
};
