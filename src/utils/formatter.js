import config from '/@/config.yaml';

export const format = {
  DATE: (date, locale = config.locale) => date?.toLocaleString(locale, config.date_format),
  TIME: (date, locale = config.locale) => date?.toLocaleString(locale, config.time_format),
};
