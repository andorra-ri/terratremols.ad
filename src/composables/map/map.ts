import { createMap as _createMap, useControls } from 'mapbox-composition';
import LegendControl from 'mapboxgl-legend';
import useLayer from './layer';
import usePopup from './popup';
import useAsync from './async';
import { Deferred } from '/@/utils';
import type { Map, MapOptions } from './types';

const { VITE_MAPBOX_TOKEN } = import.meta.env;

const map = new Deferred<Map>();

export const createMap = async (container: string | HTMLElement, options: MapOptions) => {
  // eslint-disable-next-line no-underscore-dangle
  const _map = await _createMap(container, {
    accessToken: VITE_MAPBOX_TOKEN,
    ...options,
  });

  const legend = new LegendControl();
  const { addControl } = useControls(_map);
  addControl('legend', 'bottom-left', legend);

  map.resolve(_map);
};

/* eslint-disable no-underscore-dangle */
export const useMap = () => {
  const layer = useLayer(map);
  const popup = usePopup(map);
  const async = useAsync(map);
  return { ...layer, ...popup, ...async };
};
