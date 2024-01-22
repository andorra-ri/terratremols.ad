<template>
  <ul class="links">
    <li v-for="link, i in props.links" :key="'name' in link ? link.name : i">
      <a v-if="'name' in link" :href="link.url" :target="link.target">
        {{ link.name }}
      </a>
      <slot v-else name="external" :items="link" />
    </li>
  </ul>
</template>

<script setup lang="ts">
type Link = {
  name: string;
  url: string;
  target?: 'blank';
};

const props = defineProps<{
  links:(Link | Map<string, Link[]>)[];
}>();
</script>
