<template>
  <details class="collapsible" open>
    <summary><remix-icon name="equalizer" /> Filters</summary>
    <input v-model="filters.search" placeholder="Location" type="text">
    <button class="btn" @click="reset">Reset filters</button>
  </details>
</template>

<script>
import { reactive, watch } from 'vue';
import { RemixIcon } from '/@/components';
import { normalize } from '/@/utils';
import config from '/@/config.yaml';

const INITIAL_STATE = { search: '', dates: [null, new Date()] };

export default {
  name: 'SeismFilters',
  components: { RemixIcon },
  props: {
    modelValue: {
      type: Function,
      default: () => true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const filters = reactive({ ...INITIAL_STATE, ...config.filters });

    const reset = () => Object.assign(filters, INITIAL_STATE);

    watch(filters, () => {
      const search = normalize(filters.search);
      const validator = seism => normalize(seism.location).includes(search);
      emit('update:modelValue', validator);
    }, { immediate: true });

    return { filters, reset };
  },
};
</script>
