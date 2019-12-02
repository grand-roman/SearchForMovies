
const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};


const getRandomValueMinMax = (min, max, roundingNumber = 0) => {
  return +(Math.random() * (max - min)).toFixed(roundingNumber) + min;
};

const compareRandom = () => {
  return Math.random() - 0.5;
};

export {
  render,
  getRandomValueMinMax,
  compareRandom
};
