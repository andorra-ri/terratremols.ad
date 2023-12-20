import { ref, watch, type Ref } from 'vue';

export const useCsv = <T extends object, U extends object>(
  data: Ref<T[]>,
  formatter: (item: T) => U,
) => {
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
    const keys = Object.keys(formatter(_data[0])).join(',');
    const rows = _data.map(item => Object.values(formatter(item)).join(','));
    const csv = new Blob([[keys, ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    href.value = URL.createObjectURL(csv);
  });

  return { href, download };
};
