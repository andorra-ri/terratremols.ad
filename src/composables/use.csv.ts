import { ref, watch, type Ref } from 'vue';

type CsvOptions<T, U> = {
  format?: (item: T) => U,
};

export const useCsv = <T extends object, U extends object>(
  data: Ref<T[]>,
  options: CsvOptions<T, U> = {},
) => {
  const { format } = options;
  const href = ref<string>();

  const download = (fileName: string) => {
    const link = Object.assign(document.createElement('a'), {
      download: `${fileName}.csv`,
      href: href.value,
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  watch(data, _data => {
    if (!_data.length) return;
    const keys = Object.keys(format?.(_data[0]) ?? _data[0]).join(',');
    const rows = _data.map(item => Object.values(format?.(item) ?? item).join(','));
    const csv = new Blob([[keys, ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    href.value = URL.createObjectURL(csv);
  });

  return { href, download };
};
