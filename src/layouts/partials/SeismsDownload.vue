<template>
  <div class="tooltip-container">
    <button
      :disabled="!props.seisms.length"
      @click="download(name)">
      <RemixIcon name="download" />
    </button>
    <span class="tooltip-text">{{ message('filters.download_data') }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useCsv, useI10n } from '/@/composables';
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';

const { message } = useI10n();

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
.tooltip-container {
  position: relative;
  display: inline-block;


  button {
    all: unset;
    background: #8881;
    padding: 0.5em 0.65em;
    border-radius: 0.25em;
    cursor: pointer;
    pointer-events: auto;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .tooltip-text {
    visibility: hidden;
    opacity: 0;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 0.25em;
    padding: 0.5em;
    position: absolute;
    top: 125%; /* Posiciona el tooltip per sobre */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 10;
    transition: opacity 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      transform: rotate(180deg);
      border-width: 0.5em;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
}
</style>
