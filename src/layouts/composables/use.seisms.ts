import { ref, reactive, computed, watchEffect, watch, toRef } from 'vue';
import store from '/@/store';
import { useMap, useFilters } from '/@/composables';
import { dateAdd, toFeatureCollection } from '/@/utils';
import type { Seism, Replace, Point, FiltersSeism } from '/@/types';
import config from '/@/config.yaml';

type PopupState = Replace<{
  datetime: string;
  geometry: never;
}, Seism>;

const POPUP_NAME = 'seisms-popup';

const DEFAULT_FILTERS: FiltersSeism = {
  region: '',
  dateMin: dateAdd(new Date(), { months: -1 }),
  dateMax: new Date(),
  magnitude: [1, 9],
};

export const useSeisms = () => {
  const selected = ref<Seism>();
  const filters = reactive({ ...DEFAULT_FILTERS });

  const resetFilters = () => Object.assign(filters, DEFAULT_FILTERS);

  const { filter } = useFilters<Seism>();
  const seisms = filter([
    seism => !filters.region || seism.region === filters.region,
  ], toRef(store.state, 'seisms'));

  const { addLayer, addPopup, fitTo } = useMap();

  const { popup, state, bindClick } = addPopup<PopupState>({
    name: POPUP_NAME,
    snap: true,
  });

  addLayer(computed(() => {
    const { id: lastId } = seisms.value[0] || {};
    const features = seisms.value.map(seism => {
      const last = seism.id === lastId;
      return { ...seism, last };
    }).reverse(); // Reverse to place last on top
    const source = toFeatureCollection(features);
    return { ...config.layers.SEISMS, source, onClick: bindClick };
  }));

  watchEffect(() => seisms.value.length && fitTo(seisms.value, { padding: 100 }));

  watch(
    [() => filters.dateMin, () => filters.dateMax, () => filters.magnitude],
    ([dateMin, dateMax, magnitude]) => store.loadSeisms({ dates: [dateMin, dateMax], magnitude }),
    { immediate: true },
  );

  watch(state, ({ content, geometry }) => {
    selected.value = content ? {
      ...content,
      geometry: geometry as Point,
      datetime: new Date(content.datetime),
    } : undefined;
  });

  watch(selected, seism => {
    if (seism) {
      popup.value?.setLocation(seism.coordinates);
      fitTo([seism], { padding: 100 });
    } else popup.value?.clear();
  });

  return { seisms, selected, filters, resetFilters, popup };
};
