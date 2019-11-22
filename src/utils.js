/**
 * Create new HTML element.
 * @param {HTMLElement} container
 * @param {string} template
 * @param {string} position
 */
const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

export {
  render
};
