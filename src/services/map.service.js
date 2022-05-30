import { LngLatBounds } from 'mapbox-gl';
import { useMap as useMapbox, useControls, useAsync, useMarker, usePopup } from 'mapbox-composition';
import Deferred from '/@/utils/deferred';

const { VITE_MAPBOX_TOKEN: accessToken } = import.meta.env;

const state = {
  MAP: new Deferred(),
  MARKERS: {},
};

export const useMap = async () => {
  const map = await state.MAP.promise;

  const addMarkers = (markers, fn = args => args) => {
    const context = { usePopup };
    markers.forEach(options => {
      const marker = useMarker(map, fn(options, context));
      state.MARKERS[options.id] = marker;
    });
  };

  const clearMarkers = (ids = Object.keys(state.MARKERS)) => {
    ids.forEach(id => {
      state.MARKERS[id]?.marker.remove();
      delete state.MARKERS[id];
    });
  };

  const updateMarker = (id, fn) => {
    if (id in state.MARKERS) fn(state.MARKERS[id]);
  };

  const getBounds = items => items.reduce((acc, { geometry: { coordinates } }) => {
    acc.extend(coordinates);
    return acc;
  }, new LngLatBounds());

  return { ...useAsync(map), getBounds, addMarkers, clearMarkers, updateMarker };
};

export const createMap = async (container, { options, controls = {} }) => {
  const map = await useMapbox(container, { accessToken, ...options });
  const { addNavigation, addScale } = useControls(map);
  addNavigation(controls.navigation);
  addScale(controls.scale);
  state.MAP.resolve(map);
  return useMap();
};
