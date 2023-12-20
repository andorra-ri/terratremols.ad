<template>
  <svg class="icon">
    <use :xlink:href="`/icons.svg#${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>();
</script>

<style scoped>
.icon {
  --size: 1em;

  width: var(--size);
  height: var(--size);
  vertical-align: middle;
  display: inline-block;
}
</style>
