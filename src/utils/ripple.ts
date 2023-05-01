export type RippleOptions = {
  magnitude?: number;
  size?: number;
};

export default () => {
  const createRipple = (options?: RippleOptions) => {
    const { magnitude = 1 } = options || {};
    const element = document.createElement('div');
    element.classList.add('ripple');
    element.style.setProperty('--point-size', `${8 * magnitude}px`);
    return element;
  };

  const updateRipple = (element: HTMLElement, options: RippleOptions) => {
    const { size = 0 } = options || {};
    if (size) element.style.setProperty('--size', `${size}`);
  };

  return { createRipple, updateRipple };
};
