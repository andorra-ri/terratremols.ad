import { ref, watch, effectScope, onUnmounted } from 'vue';
import { useGeoJSON } from 'mapbox-composition';
import type { Map, LayerOptions } from './types';
import type { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const addLayer = (options: LayerOptions) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle
    const layer = ref<ReturnType<typeof useGeoJSON>>();

    (async () => {
      const resolved = await map.promise;
      layer.value = useGeoJSON(resolved, _options.value);
    })();

    const scope = effectScope();
    scope.run(() => {
      watch(_options, ({ source, layers }) => {
        layer.value?.updateSource(source);
        layer.value?.updateLayers(layers);
      });
    });

    onUnmounted(() => {
      scope.stop();
      layer.value?.clearSource();
      layer.value = undefined;
    });

    return layer;
  };

  return { addLayer };
};
