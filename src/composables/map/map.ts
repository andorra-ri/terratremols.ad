import { useMap as useMapbox, useControls } from 'mapbox-composition';
import useLayer from './layer';
import usePopup from './popup';
import useAsync from './async';
import { Deferred } from '/@/utils';
import type { Map, MapOptions } from './types';

const { VITE_MAPBOX_TOKEN } = import.meta.env;

const map = new Deferred<Map>();

export const createMap = async (container: string | HTMLElement, options: MapOptions) => {
  const { controls = {}, ...mapOptions } = options;
  // eslint-disable-next-line no-underscore-dangle
  const _map = await useMapbox(container, {
    accessToken: VITE_MAPBOX_TOKEN,
    ...mapOptions,
  });

  const addControl = useControls(_map);
  Object.entries(controls).forEach(([name, control]) => {
    // eslint-disable-next-line
    // @ts-ignore
    addControl[`add${name}`](control);
  });

  map.resolve(_map);
};

/* eslint-disable no-underscore-dangle */
export const useMap = () => {
  const layer = useLayer(map);
  const popup = usePopup(map);
  const async = useAsync(map);
  return { ...layer, ...popup, ...async };
};
