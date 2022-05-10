export default () => {
  const createRipple = (options = {}) => {
    const { magnitude = 1 } = options;
    const element = document.createElement('div');
    element.classList.add('ripple');
    element.style.setProperty('--point-size', `${8 * Math.sqrt(magnitude)}px`);
    return element;
  };

  const updateRipple = (element, options = {}) => {
    const { size } = options;
    if (size) element.style.setProperty('--size', size);
  };

  return { createRipple, updateRipple };
};
