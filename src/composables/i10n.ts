import { reactive, toRefs, h, type FunctionalComponent } from 'vue';

type I10nOptions = {
  locale: string;
  messages: Record<string, Record<string, any>>;
  dateFormat?: Intl.DateTimeFormatOptions;
  timeFormat?: Intl.DateTimeFormatOptions;
};

type I10nProps = {
  tag?: string,
  path: string,
};

const REPLACE_REGEX = /{([^{}]+)}/g; // Match text between curly braces

const state = reactive<I10nOptions>({
  locale: Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0],
  messages: {},
  dateFormat: undefined,
});

const objectPath = (obj: Record<string, any>, path: string): any => {
  const keys = path.split('.');
  return keys.reduce((acc, key) => acc?.[key], obj) || path;
};

export const createI10n = (options: Partial<I10nOptions>) => Object.assign(state, options);

export const useI10n = () => {
  const message = (path: string, object?: Record<string, string>): string => {
    const locale = state.locale in state.messages ? state.locale : Object.keys(state.messages)[0];
    const entry = objectPath(state.messages[locale], path) as string;
    return entry.replace(REPLACE_REGEX, (match, key) => object?.[key.trim()] || match);
  };

  const formatDate = (date: Date | number | string, format?: Intl.DateTimeFormatOptions) => {
    const { locale, dateFormat } = state;
    return new Date(date).toLocaleDateString([locale], format || dateFormat);
  };

  const formatTime = (date: Date | number | string, format?: Intl.DateTimeFormatOptions) => {
    const { locale, timeFormat } = state;
    return new Date(date).toLocaleTimeString([locale], format || timeFormat);
  };

  const I10n: FunctionalComponent<I10nProps> = (props, ctx) => {
    const entry = objectPath(state.messages, props.path) as string;
    const content = entry.split(REPLACE_REGEX).map(part => ctx.slots[part]?.() || part);
    return h(props.tag || 'p', content);
  };

  const setLocale = (locale: string) => { state.locale = locale; };
  const { locale } = toRefs(state);

  return { message, formatDate, formatTime, I10n, locale, setLocale };
};
