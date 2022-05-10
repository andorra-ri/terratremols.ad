<template>
  <section id="map-view">
    <div id="map" />
    <seism-popup :seism="selectedSeism" to="seism-popup" />
    <div class="panel">
      <div class="panel__toggler">Seisms List</div>
      <header>
        <seism-filters v-model="filter" />
      </header>
      <seism-list v-model="selectedSeism" :seisms="seisms" />
    </div>
  </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { createMap, useMap } from '/@/services/map.service';
import { useSeismFilter } from '/@/services/seisms.service';
import { SeismList, SeismFilters, SeismPopup } from '/@/components';
import config from '/@/config.yaml';

const { ripple } = config.markers;

const changeRipple = ({ size }) => ({ marker }) => {
  const element = marker.getElement();
  element.style.setProperty('--size', size);
};

export default {
  name: 'SectionMap',
  components: { SeismList, SeismFilters, SeismPopup },
  setup() {
    const map = useMap();
    const filter = ref(() => true);
    const seisms = useSeismFilter(filter);
    const selectedSeism = ref(undefined);

    watch(seisms, async () => {
      const { addMarkers, clearMarkers, updateMarker, getBounds, fitBounds } = await map;
      clearMarkers();
      addMarkers(seisms.value, (seism, { usePopup }) => {
        const { id, magnitude, coordinates } = seism;
        const element = document.createElement('div');
        element.classList.add('ripple');
        element.style.setProperty('--point-size', `${8 * Math.sqrt(magnitude)}px`);
        const popup = usePopup({
          name: 'seism-popup',
          onOpen: () => { selectedSeism.value = seism; },
          onClose: () => { selectedSeism.value = undefined; },
        });
        return { id, element, coordinates, popup };
      });
      updateMarker(selectedSeism.value?.id, changeRipple(ripple.ACTIVE));
      const bounds = getBounds(seisms.value);
      if ('_sw' in bounds) fitBounds(bounds, { padding: 100, maxZoom: 13 });
    }, { immediate: true });

    watch(selectedSeism, async (seism, prev) => {
      const { updateMarker, flyTo } = await map;
      updateMarker(prev?.id, changeRipple(ripple.IDLE));
      updateMarker(seism?.id, changeRipple(ripple.ACTIVE));
      if (seism) flyTo({ center: seism.coordinates, zoom: 11 });
    });

    onMounted(() => createMap('map', config.map));

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
