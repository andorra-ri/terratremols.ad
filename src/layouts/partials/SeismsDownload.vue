<template>
  <button
    :disabled="!props.seisms.length"
    @click="download(name)">
    <RemixIcon name="download" />
  </button>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useCsv } from '/@/composables';
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';

const props = defineProps<{
  seisms: Seism[];
}>();

const { download } = useCsv(toRef(props, 'seisms'), {
  filter: seism => seism.validated,
  format: seism => {
    const { datetime, magnitude, depth, region, coordinates: [lon, lat] } = seism;
    const timestamp = datetime.toISOString();
    return { timestamp, lon, lat, magnitude, depth, region };
  },
});

const name = computed(() => {
  if (!props.seisms.length) return 'terratrèmols';
  const dates = props.seisms.map(seism => seism.datetime.getTime());
  const dateMin = new Date(Math.min(...dates)).toLocaleDateString('se');
  const dateMax = new Date(Math.max(...dates)).toLocaleDateString('se');
  return `terratremols_${dateMin}_${dateMax}`;
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
