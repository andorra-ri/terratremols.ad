<template>
  <teleport v-if="to && seism" :key="seism.id" :to="`#${to}`">
    <div class="seism-popup">
      <div class="seism-popup__magnitude">
        <p>Magnitude <em>{{ seism.magnitude }}</em> seism</p>
      </div>
      <div class="seism-popup__data">
        <p class="seism-popup__location">
          <remix-icon name="map-pin" />
          <span class="label">Location</span>
          {{ seism.geometry.coordinates }}
          Epicenter at {{ seism.from.distance }} km {{ seism.from.direction }} from {{ seism.from.name }}
        </p>
        <p class="seism-popup__date">
          <remix-icon name="calendar-event" />
          <span class="label">Date</span>
          {{ format.DATE(seism.date) }}
        </p>
        <p class="seism-popup__time">
          <remix-icon name="time" />
          <span class="label">Time</span>
          {{ format.TIME(seism.date) }}
        </p>
        <p class="seism-popup__depth">
          <remix-icon name="download" />
          <span class="label">Depth</span>
          {{ seism.depth }} km deep
        </p>
      </div>
      <p>
        <a href="https://andorra-ri.github.io/enquesta-sismica/" target="blank" class="btn block">Fill survey</a>
        <a href="#" class="btn btn--flat block">View survey results</a>
      </p>
    </div>
  </teleport>
</template>

<script>
import { format } from '/@/utils';
import { RemixIcon } from '/@/components';

export default {
  name: 'SeismPopup',
  components: { RemixIcon },
  props: {
    seism: { type: Object, default: undefined },
    to: { type: String, required: true },
  },
  setup() {
    return { format };
  },
};
</script>
