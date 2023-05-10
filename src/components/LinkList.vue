<template>
  <ul class="links">
    <li v-for="link in props.links" :key="link.id">
      <a :href="link.url" :target="link.target">
        {{ message(link.id) }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';

const { message } = useI10n();

const props = defineProps<{
  links: {
    id: string;
    url: string;
    target?: 'blank';
  }[];
}>();
</script>
