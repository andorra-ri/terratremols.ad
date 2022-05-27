import config from '/@/config.yaml';

export const format = {
  SHORT_DATE: (date, locale = config.locale) => date?.toLocaleString(locale, config.short_date_format),
  DATE: (date, locale = config.locale) => date?.toLocaleString(locale, config.date_format),
  TIME: (date, locale = config.locale) => date?.toLocaleString(locale, config.time_format),
};

export const round = (number, decimals = 0) => {
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
};
