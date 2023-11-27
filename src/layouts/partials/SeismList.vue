<template>
  <ul class="seisms">
    <li
      v-for="seism in props.seisms"
      :key="seism.id"
      :class="['seism', { 'seism--active': seism.id === selected?.id }]"
      :style="`--magnitude:${seism.magnitude}`"
      @click="selectSeism(seism)">
      <div class="seism__marker">
        <div class="ripple" :style="`--point-size:${8 * Math.sqrt(seism.magnitude)}px`" />
        <span class="seism__magnitude">{{ seism.magnitude }}</span>
      </div>
      <div class="seism__details">
        <span class="seism__date">{{ formatDate(seism.datetime) }}</span>
        <span class="seism__time">
          {{ message('seism.time', { time: formatTime(seism.datetime) }) }}
        </span>
        <span class="seism__location">{{ seism.region }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import type { Seism } from '/@/types';

const props = defineProps<{
  seisms: Seism[];
}>();

const selected = defineModel<Seism | undefined>({ required: true });

const { message, formatDate, formatTime } = useI10n();

const selectSeism = (seism: Seism | undefined) => {
  selected.value = seism?.id === selected.value?.id ? undefined : seism;
};
</script>

<style lang="scss" scoped>
ul.seisms {
  flex: 1;
  overflow: auto;

  .ripple {
    --color: var(--color-primary);
    --border-color: var(--color-primary);
    --size: 0.75rem;
    --ripple: 1;

    position: absolute;
    margin: auto;
    box-sizing: border-box;
    background: var(--color);
    background-clip: content-box;
    height: var(--size);
    width: var(--size);
    border-radius: 50%;
    border: 1px solid var(--border-color);
    cursor: pointer;
    transform: translate(-50%, -50%);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      height: calc(100% + var(--ripple) * var(--size));
      width: calc(100% + var(--ripple) * var(--size));
      border-radius: 50%;
      border: 1px solid var(--color);
      background: radial-gradient(circle at center, transparent 25%, var(--color) 150%);
      animation: ripple 2s infinite ease-out both;
      pointer-events: none;
      box-sizing: border-box;
    }

    &::after { animation-delay: 1s; }

    &:hover { --point-size: 16px;}
  }

  .seism {
    --magnitude: 1;

    padding: 1rem 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;

    & + .seism { border-top: 1px solid #0001; }

    &__date {
      display: block;
      font-weight: bold;
    }

    &__location {
      display: block;
      font-size: 0.9rem;
      opacity: 0.5;
    }

    &__marker {
      margin: 0 2rem 0 0.5rem;
      position: relative;
      border-bottom: 1px solid green;
    }

    &__magnitude {
      position: absolute;
      display: inline-block;
      color: var(--color-primary);
      padding: 0.25rem;
      border-radius: var(--border-radius);
      line-height: 1;
      font-weight: bold;
      font-size: 0.75rem;
      transform: translate(-50%, -50%);
    }

    .ripple {
      --size: calc(15px + 5px * var(--magnitude));
      --color: transparent;
    }

    &--active {
      background: var(--color-primary);
      color: #fff;
      border: 0 !important;
      position: sticky;
      top: 0;
      bottom: 0;
      z-index: 1;

      .ripple {
        --color: #fff;
        --ripple: var(--magnitude);
      }
    }
  }
}
</style>
