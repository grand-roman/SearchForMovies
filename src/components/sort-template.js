
const getSortTemplate = (sortType) => {
  return Object.keys(sortType).map((type) => (`
    <li>
      <a href="#" class="sort__button
      ${sortType[type] ? ` sort__button--active` : ``}">
        Sort by ${type}
      </a>
    </li>`).trim()).join(``);
};

export {
  getSortTemplate
};
