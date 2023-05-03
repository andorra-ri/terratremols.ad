<template>
  <teleport :to="`#${props.to}`">
    <div class="seism-popup">
      <div class="seism-popup__magnitude">
        <p>Magnitude <em>{{ props.seism.magnitude }}</em> seism</p>
      </div>
      <div class="seism-popup__data">
        <p class="seism-popup__location">
          <RemixIcon name="map-pin" />
          <span class="label">Location</span>
          Epicenter at
          {{ round(props.seism.from.distance, 1) }}km
          {{ props.seism.from.direction }}
          from {{ props.seism.from.name }}
        </p>
        <p class="seism-popup__depth">
          <RemixIcon name="download" />
          <span class="label">Depth</span>
          {{ props.seism.depth }} km deep
        </p>
        <p class="seism-popup__date">
          <RemixIcon name="calendar-event" />
          <span class="label">Date</span>
          {{ new Date(props.seism.datetime).toLocaleDateString('ca', config.formats.DATE) }}
        </p>
        <p class="seism-popup__time">
          <RemixIcon name="time" />
          <span class="label">Time</span>
          {{ new Date(props.seism.datetime).toLocaleTimeString('ca', config.formats.TIME) }}
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
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';
import config from '/@/config.yaml';

const round = (num: number, decimals = 0) => +num.toFixed(decimals);

const props = defineProps<{
  seism: Seism;
  to: string,
}>();
</script>
