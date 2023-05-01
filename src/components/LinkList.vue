<template>
  <ul class="links">
    <li v-for="link in props.links" :key="link.name">
      <a :href="link.url" :target="link.target">{{ link.name }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  links: {
    name: string;
    url: string;
    target?: 'blank';
  }[];
}>();
</script>
