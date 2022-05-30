import config from '/@/config.yaml';

export const format = {
  ...Object.entries(config.formats.datetime)
    .reduce((acc, [name, options]) => {
      acc[name] = (date, locale = config.locale) => date?.toLocaleString(locale, options);
      return acc;
    }, {}),
};

export const round = (number, decimals = 0) => {
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
};
