<template>
  <details class="collapsible">
    <summary>
      <slot name="title">{{ props.title }}</slot>
      <aside>
        <slot name="aside" />
      </aside>
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();

defineSlots<{
  title:() => any;
  aside: () => any
  default: () => any;
}>();
</script>

<style lang="scss" scoped>
.collapsible {
  summary {
    color: var(--color-primary);
    border-bottom: 1px solid #8882;
    display: flex;

    aside {
      margin: -1rem 0;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>
