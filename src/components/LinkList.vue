<template>
  <ul class="links">
    <li v-for="link in links" :key="link.name">
      <a :href="link.url" :target="link.target">{{ link.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LinkList',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>
