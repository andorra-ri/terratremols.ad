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
        <span class="seism__date">{{ format.DATE(seism.date) }}</span>
        <span class="seism__time">{{ format.TIME(seism.date) }}</span>
        <span class="seism__location">{{ seism.location }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { format } from '/@/utils';

export default {
  name: 'SeismList',
  props: {
    modelValue: { type: Object, default: undefined },
    seisms: { type: Array, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectSeism = seism => {
      const target = seism?.id === props.modelValue?.id ? undefined : seism;
      emit('update:modelValue', target);
    };

    return { selectSeism, format };
  },
};
</script>
