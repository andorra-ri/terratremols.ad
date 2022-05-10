<template>
  <teleport v-if="to && seism" :key="seism.id" :to="`#${to}`">
    {{ seism }}
  </teleport>
</template>

<script>
export default {
  name: 'SeismPopup',
  props: {
    seism: { type: Object, default: undefined },
    to: { type: String, required: true },
  },
};
</script>
