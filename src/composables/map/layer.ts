import { ref, watch, effectScope, onUnmounted } from 'vue';
import { useGeoJSON, useImages } from 'mapbox-composition';
import type { Map, LayerOptions, ImageOptions } from './types';
import type { Deferred } from '/@/utils';

export default (map: Deferred<Map>) => {
  const addLayer = (options: LayerOptions) => {
    const _options = ref(options); // eslint-disable-line no-underscore-dangle
    const layer = ref<ReturnType<typeof useGeoJSON>>();

    const updateImages = async (images: ImageOptions) => {
      const _map = await map.promise;
      const { addImages, removeImages } = useImages(_map);
      removeImages(Object.keys(images));
      const { urls, ...imageOptions } = 'urls' in images ? images : { urls: images };
      await addImages(urls as Record<string, string>, { ...imageOptions, persist: false });
      _map.once('style.load', () => updateImages(images));
    };

    (async () => {
      const resolved = await map.promise;
      if (_options.value.images) updateImages(_options.value.images);
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
