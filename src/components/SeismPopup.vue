<template>
  <teleport v-if="props.to && props.seism" :key="props.seism.id" :to="`#${props.to}`">
    <div class="seism-popup">
      <div class="seism-popup__magnitude">
        <p>Magnitude <em>{{ props.seism.magnitude }}</em> seism</p>
      </div>
      <div class="seism-popup__data">
        <p class="seism-popup__location">
          <RemixIcon name="map-pin" />
          <span class="label">Location</span>
          {{ props.seism.geometry.coordinates }}
          Epicenter at
          {{ props.seism.from.distance }}km
          {{ props.seism.from.direction }}
          from {{ props.seism.from.name }}
        </p>
        <p class="seism-popup__date">
          <RemixIcon name="calendar-event" />
          <span class="label">Date</span>
          {{ format.DATE(props.seism.date) }}
        </p>
        <p class="seism-popup__time">
          <RemixIcon name="time" />
          <span class="label">Time</span>
          {{ format.TIME(props.seism.date) }}
        </p>
        <p class="seism-popup__depth">
          <RemixIcon name="download" />
          <span class="label">Depth</span>
          {{ props.seism.depth }} km deep
        </p>
      </div>
      <p>
        <a href="https://andorra-ri.github.io/enquesta-sismica/" target="blank" class="btn block">Fill survey</a>
        <a href="#" class="btn btn--flat block">View survey results</a>
      </p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { format } from '/@/utils';
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';

const props = defineProps<{
  seism: Seism | undefined;
  to: string,
}>();
</script>
