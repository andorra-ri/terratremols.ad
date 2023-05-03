import { ref, watch, effectScope, onUnmounted, type UnwrapRef } from 'vue';
import { usePopup } from 'mapbox-composition';
import { parse } from './utils';
import { uid, type Deferred } from '/@/utils';
import type { Map, PopupOptions, MapMouseEvent } from './types';
import type { MaybeRef } from '/@/types';

type Options = {
  snap: boolean;
} & PopupOptions;

export default (map: Deferred<Map>) => {
  const addPopup = <T>(options: MaybeRef<Options> = {}) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle

    const popup = ref<ReturnType<typeof usePopup>>();
    const state = ref<{ name: string, content: T | undefined}>({
      name: _options.value.name || `popup-${uid()}`,
      content: undefined,
    });

    (async () => {
      const resolved = await map.promise;
      popup.value = usePopup(resolved, _options.value);
    })();

    const bindClick = ({ lngLat, features }: MapMouseEvent) => {
      const [{ geometry, properties }] = features;
      if (_options.value.snap && geometry.type === 'Point') popup.value?.setLocation(geometry.coordinates);
      else popup.value?.setLocation(lngLat);
      state.value.content = parse(properties) as UnwrapRef<T> | undefined;
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
      popup.value?.popup.remove();
      popup.value = undefined;
    });

    return { popup, state, bindClick };
  };

  return { addPopup };
};
