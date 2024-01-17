<template>
  <teleport :to="`#${props.to}`">
    <div class="seism-popup">
      <h3>
        {{ message('station.name') }}
        {{ props.station.name }}
      </h3>
      <a
        :href="`${config.seismogramsURL}${props.station.id}.latest.png#${Date.now()}`"
        target="_blank"
        class="seismogram">
        <img :src="`${config.seismogramsURL}${props.station.id}.latest.png#${Date.now()}`">
      </a>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import type { Station } from '/@/types';
import config from '/@/config.yaml';

const { message } = useI10n();

const props = defineProps<{
  station: Station;
  to: string,
}>();

</script>

<style lang="scss" scoped>
.seism-popup {
  width: 30rem;

  h3 {
    margin: 1rem;
  }

  .seismogram {
    margin: 0.5rem 0;

    &:hover { animation: none; }

    img { max-width: 100%; }
  }
}
</style>
