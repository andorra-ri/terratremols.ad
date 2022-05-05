<template>
  <ul class="seisms">
    <li
      v-for="seism in seisms"
      :key="seism.id"
      :class="['seism', { 'seism--active': seism.id === modelValue?.id }]"
      @click="selectSeism(seism)">
      <div class="seism__marker"><div class="ripple" /></div>
      <div class="seism__details">
        <span class="seism__date">{{ dateFormat(seism.date) }}</span>
        <span class="seism__time">{{ timeFormat(seism.date) }}</span>
        <span class="seism__location">{{ seism.location }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import config from '/@/config.yaml';

export default {
  name: 'SeismList',
  props: {
    modelValue: { type: Object, default: undefined },
    seisms: { type: Array, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dateFormat = date => date.toLocaleString('en', config.date_format);
    const timeFormat = date => date.toLocaleString('en', config.time_format);

    const selectSeism = seism => {
      const target = seism?.id === props.modelValue?.id ? undefined : seism;
      emit('update:modelValue', target);
    };

    return { dateFormat, timeFormat, selectSeism };
  },
};
</script>
