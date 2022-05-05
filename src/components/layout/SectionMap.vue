<template>
  <section id="map-view">
    <div id="map" />
  </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { createMap, useMap } from '/@/services/map.service';
import { useSeismFilter } from '/@/services/seisms.service';
import config from '/@/config.yaml';

const { ripple } = config.markers;

const changeRipple = ({ size }) => ({ marker }) => {
  const element = marker.getElement();
  element.style.setProperty('--size', size);
};

export default {
  name: 'SectionMap',
  setup() {
    const map = useMap();
    const filter = ref(() => true);
    const seisms = useSeismFilter(filter);
    const selectedSeism = ref(undefined);

    watch(seisms, async () => {
      const { addMarkers, clearMarkers, updateMarker, getBounds, fitBounds } = await map;
      clearMarkers();
      addMarkers(seisms.value, seism => {
        const { id, coordinates } = seism;
        const element = document.createElement('div');
        element.classList.add('ripple');
        element.addEventListener('click', () => {
          selectedSeism.value = seism;
        });
        return { id, element, coordinates };
      });
      updateMarker(selectedSeism.value?.id, changeRipple(ripple.ACTIVE));
      fitBounds(getBounds(seisms.value), { padding: 100, maxZoom: 13 });
    }, { immediate: true });

    watch(selectedSeism, async (seism, prev) => {
      const { updateMarker, flyTo } = await map;
      updateMarker(prev?.id, changeRipple(ripple.IDLE));
      updateMarker(seism?.id, changeRipple(ripple.ACTIVE));
      if (seism) flyTo({ center: seism?.coordinates, zoom: 11 });
    });

    onMounted(async () => createMap('map', config.map));

    return { seisms, selectedSeism, filter };
  },
};
</script>

<style lang="scss" scoped>
#map-view {
  position: relative;
  overflow: hidden;
}
</style>
