import { ref, watch, effectScope, onUnmounted, type UnwrapRef } from 'vue';
import { usePopup } from 'mapbox-composition';
import { parse } from './utils';
import { uid, type Deferred } from '/@/utils';
import type { Map, PopupOptions, MapLayerMouseEvent } from './types';
import type { MaybeRef, Geometry } from '/@/types';

type Options = {
  snap?: boolean;
} & PopupOptions;

type State<T> = {
  name: string,
  content: T | undefined,
  geometry: Geometry | undefined
};

export default (map: Deferred<Map>) => {
  const addPopup = <T>(options: MaybeRef<Options> = {}) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle

    const popup = ref<ReturnType<typeof usePopup>>();
    const state = ref<State<T>>({
      name: _options.value.name || `popup-${uid()}`,
      content: undefined,
      geometry: undefined,
    });

    (async () => {
      const resolved = await map.promise;
      popup.value = usePopup(resolved, _options.value);
    })();

    const bindClick = ({ lngLat, features }: MapLayerMouseEvent) => {
      const [{ geometry, properties }] = features;
      if (_options.value.snap && geometry.type === 'Point') popup.value?.setLocation(geometry.coordinates);
      else popup.value?.setLocation(lngLat);
      state.value = {
        ...state.value,
        content: parse(properties) as UnwrapRef<T> | undefined,
        geometry: geometry as Geometry,
      };
    };

    const scope = effectScope();
    scope.run(() => {
      watch(_options, ({ coordinates, content }) => {
        if (coordinates) popup.value?.setLocation(coordinates);
        if (content) popup.value?.setContent(content);
      });
    });

    onUnmounted(() => {
      scope.stop();
      popup.value?.clear();
      popup.value = undefined;
    });

    return { popup, state, bindClick };
  };

  return { addPopup };
};
