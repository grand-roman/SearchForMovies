import {generatorRandom} from './utils';

const generateMenuCount = () => Math.round(generatorRandom.generateRandomNumber(0, 20));
export const generateRank = () => {
  let count = Math.round(generatorRandom.generateRandomNumber(0, 30));
  let strRank = ``;
  if (count <= 10 && count > 0) {
    strRank = `novice`;
  } else if (count <= 21 && count > 10) {
    strRank = `fan`;
  } else if (count > 21) {
    strRank = `movie buff`;
  } return strRank;
};

export const favorites = generateMenuCount();

