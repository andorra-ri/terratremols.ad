<template>
  <div
    :class="['dropdown', { right }]"
    @focusin="onOpen"
    @focusout="onClose">
    <div class="dropdown__toggle" tabindex="1">
      <slot name="toggle" />
    </div>
    <div class="dropdown__panel" tabindex="1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  right?: boolean;
}>();

const isOpen = defineModel<boolean>('open', { default: false });

const onOpen = () => { isOpen.value = true; };
const onClose = () => { isOpen.value = false; };
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  z-index: 1; 

  &__panel {
    position: absolute;
    top: 100%;
    display: none;

    :focus + &,
    &:focus-within,
    &:hover { display: block; }
  }

  &.right &__panel { right: 0; }
}
</style>
