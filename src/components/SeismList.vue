<template>
  <ul class="seisms">
    <li
      v-for="seism in seisms"
      :key="seism.id"
      :class="['seism', { 'seism--active': seism.id === modelValue?.id }]"
      @click="selectSeism(seism)">
      <div class="seism__marker">
        <div class="ripple" :style="`--point-size:${8 * Math.sqrt(seism.magnitude)}px`" />
        <span class="seism__magnitude">{{ seism.magnitude }}</span>
      </div>
      <div class="seism__details">
        <span class="seism__date">{{ format.DATE(seism.datetime) }}</span>
        <span class="seism__time">{{ format.TIME(seism.datetime) }}</span>
        <span class="seism__location">{{ seism.region }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { format } from '/@/utils';
import type { Seism } from '/@/types';

const props = defineProps<{
  modelValue: Seism | undefined;
  seisms: Seism[];
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: Seism | undefined): void}>();

const selectSeism = (seism: Seism | undefined) => {
  const target = seism?.id === props.modelValue?.id ? undefined : seism;
  emit('update:modelValue', target);
};
</script>
