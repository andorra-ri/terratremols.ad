<template>
  <button
    :disabled="!props.seisms.length"
    @click="download(props.name)">
    <RemixIcon name="download" />
  </button>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useCsv } from '/@/composables';
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';

const props = defineProps<{
  seisms: Seism[];
  name: string;
}>();

const { download } = useCsv(toRef(props, 'seisms'), seism => {
  const { datetime, magnitude, depth, region, coordinates: [lon, lat] } = seism;
  const timestamp = datetime.toISOString();
  return { timestamp, lon, lat, magnitude, depth, region };
});
</script>

<style lang="scss" scoped>
button {
  all: unset;
  background: #8881;
  padding: 0.5em 0.65em;
  border-radius: 0.25em;

  &:disabled { cursor: not-allowed; }
}
</style>
