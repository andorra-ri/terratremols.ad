<template>
  <Dropdown class="selector" style="z-index: 1;">
    <template #toggle>
      <div class="selector__toggle">
        <slot name="toggle" :item="selected">
          <slot :item="selected">
            <span v-if="selected" class="selected">
              {{ props.formatter?.(selected) || selected }}
            </span>
            <span v-else class="placeholder">{{ props.placeholder }}</span>
          </slot>
        </slot>
        <RemixIcon v-if="selected && props.clearable" name="close" @click="clear" />
        <RemixIcon v-else name="chevron" />
      </div>
    </template>
    <ul class="selector__options" :data-empty="props.emptyText">
      <li v-for="option, i in props.options" :key="i">
        <label>
          <input v-model="selected" :value="option" type="radio">
          <slot name="option" :option="option">
            <slot :item="option">
              {{ props.formatter?.(option) || option }}
            </slot>
          </slot>
        </label>
      </li>
    </ul>
  </Dropdown>
</template>

<script setup lang="ts" generic="T">
import Dropdown from './Dropdown.vue';
import RemixIcon from './RemixIcon.vue';

defineSlots<{
  default?:(props: { item: T | undefined }) => void;
  toggle?:(props: { item: T | undefined }) => void;
  topbar?:() => void;
  option?:(props: { option: T }) => void;
}>();

const props = defineProps<{
  options: T[];
  formatter?:(item: T) => string;
  placeholder?: string;
  clearable?: boolean;
  emptyText?: string
}>();

const selected = defineModel<T>();

const clear = () => {
  selected.value = undefined;
};
</script>
