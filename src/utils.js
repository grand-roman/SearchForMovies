const KEYS = {
  'ESC': 27,
  'ENTER': 13
};

const addElementDOM = (container, component) => {
  component.render();
  const cloneElement = component.getCloneElement();
  component.bind(cloneElement);
  container.append(cloneElement);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  const fragment = document.createDocumentFragment();
  const childrenCount = newElement.childNodes.length;
  for (let i = 0; i < childrenCount; i++) {
    fragment.appendChild(newElement.childNodes[0]);
  }
  return fragment;
};

const getRandomValueMinMax = (min, max, roundingNumber = 0) => {
  return +(Math.random() * (max - min)).toFixed(roundingNumber) + min;
};

const compareRandom = () => {
  return Math.random() - 0.5;
};

export {
  KEYS,
  createElement,
  getRandomValueMinMax,
  compareRandom,
  addElementDOM
};
