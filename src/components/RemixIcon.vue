<template>
  <svg class="icon">
    <use :xlink:href="`/@/assets/images/icons.svg#${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>();
</script>
