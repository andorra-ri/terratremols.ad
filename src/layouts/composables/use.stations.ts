import { computed } from 'vue';
import { useMap } from '/@/composables';
import { toPoint, toFeatureCollection } from '/@/utils';
import type { Station } from '/@/types';
import config from '/@/config.yaml';

const POPUP_NAME = 'seisms-popup';

export const useStations = (stations: Station[]) => {
  const { addLayer, addPopup } = useMap();

  const { state, bindClick } = addPopup<Station>({
    name: POPUP_NAME,
    snap: true,
  });

  addLayer(computed(() => {
    const features = stations.map(station => toPoint(station.coordinates, station));
    const source = toFeatureCollection(features);
    return { ...config.layers.STATIONS, source, onClick: bindClick };
  }));

  return state;
};
