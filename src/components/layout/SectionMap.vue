<template>
  <section id="map-view">
    <div id="map" />
    <seism-popup
      v-if="isSeismPopupOpen"
      :seism="selectedSeism"
      to="seism-popup" />
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
import { useRipple } from '/@/utils';
import config from '/@/config.yaml';

const { createRipple, updateRipple } = useRipple();
const { ripple } = config.markers;

export default {
  name: 'SectionMap',
  components: { SeismList, SeismFilters, SeismPopup },
  setup() {
    const map = useMap();
    const filter = ref(() => true);
    const seisms = useSeismFilter(filter);
    const selectedSeism = ref(undefined);
    const isSeismPopupOpen = ref(false);

    watch(seisms, async () => {
      const { addMarkers, clearMarkers, getBounds, fitBounds } = await map;
      clearMarkers();
      addMarkers(seisms.value, (seism, { usePopup }) => {
        const { id, magnitude, geometry: { coordinates } } = seism;
        const element = createRipple({ magnitude });
        const popup = usePopup({
          name: 'seism-popup',
          onOpen: () => {
            isSeismPopupOpen.value = true;
            selectedSeism.value = seism;
          },
          onClose: () => {
            isSeismPopupOpen.value = false;
            selectedSeism.value = undefined;
          },
        });
        return { id, element, coordinates, popup };
      });
      const bounds = getBounds(seisms.value);
      if ('_sw' in bounds) fitBounds(bounds, { padding: 100, maxZoom: 13 });
    }, { immediate: true });

    watch(selectedSeism, async (seism, prev) => {
      const { updateMarker, flyTo } = await map;
      updateMarker(prev?.id, ({ marker }) => {
        if (marker.getPopup().isOpen()) marker.togglePopup();
        updateRipple(marker.getElement(), ripple.IDLE);
      });
      updateMarker(seism?.id, async ({ marker }) => {
        await flyTo({ center: seism.geometry.coordinates, zoom: 11 });
        if (!marker.getPopup().isOpen()) marker.togglePopup();
        updateRipple(marker.getElement(), ripple.ACTIVE);
      });
    });

    onMounted(() => createMap('map', config.map));

    return { seisms, selectedSeism, isSeismPopupOpen, filter };
  },
};
</script>
