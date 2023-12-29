import { ref, reactive, computed, watch, type Ref } from 'vue';
import { useMap, useFilters } from '/@/composables';
import { normalize, dateAdd, toFeatureCollection } from '/@/utils';
import type { Seism, Replace, Point, FiltersSeism } from '/@/types';
import config from '/@/config.yaml';

type PopupState = Replace<{
  datetime: string;
  geometry: never;
}, Seism>;

const POPUP_NAME = 'seisms-popup';

const DEFAULT_FILTERS: FiltersSeism = {
  search: '',
  dateMin: dateAdd(new Date(), { months: -1 }),
  dateMax: new Date(),
  magnitude: [-2, 9],
};

export default (seismsList: Ref<Seism[]>) => {
  const selected = ref<Seism>();
  const filters = reactive({ ...DEFAULT_FILTERS });

  const resetFilters = () => Object.assign(filters, DEFAULT_FILTERS);

  const { filter } = useFilters<Seism>();
  const filteredSeisms = filter([
    seism => normalize(seism.region).includes(normalize(filters.search || '')),
    seism => seism.datetime >= filters.dateMin && seism.datetime <= filters.dateMax,
    seism => seism.magnitude >= filters.magnitude[0] && seism.magnitude <= filters.magnitude[1],
  ], seismsList);

  const { addLayer, addPopup, fitTo } = useMap();

  const { popup, state, bindClick } = addPopup<PopupState>({
    name: POPUP_NAME,
    snap: true,
  });

  addLayer(computed(() => {
    const source = toFeatureCollection(filteredSeisms.value);
    return { ...config.layers.SEISMS, source, onClick: bindClick };
  }));

  watch(state, ({ content, geometry }) => {
    selected.value = content ? {
      ...content,
      geometry: geometry as Point,
      datetime: new Date(content.datetime),
    } : undefined;
  });

  watch(filteredSeisms, seisms => seisms.length && fitTo(seisms, { padding: 100 }));

  watch(selected, seism => {
    if (seism) {
      popup.value?.setLocation(seism.coordinates);
      fitTo([seism], { padding: 100 });
    } else popup.value?.clear();
  });

  return { seisms: filteredSeisms, selected, filters, resetFilters, popup };
};
