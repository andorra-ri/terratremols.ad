<template>
  <div class="popover-container">
    <div class="popover-target" tabindex="0">
      <slot name="target" />
    </div>
    <div class="popover" :style="{ width: props.width ?? 'auto' }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  default?:(props: object) => void;
  target?: (props: object) => void;
}>();

const props = defineProps<{
  width?: string;
}>();
</script>

<style lang="scss" scoped>
.popover {
  position: absolute;
  z-index: 1;
  display: none;
  bottom: 100%;
  background: #fff;
  box-shadow: 0 0 0.5rem 0.25rem #00000008;
  border: 1px solid #0001;
  padding: 1rem;
  border-radius: 0.25rem;
  text-align: left;
  transform: translateX(-50%);

  &-container {
    display: inline;
    position: relative;
  }

  &:hover,
  &-container:focus-within > & {
    display: block;
  }
}
</style>
