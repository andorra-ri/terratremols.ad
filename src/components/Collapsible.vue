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
details.collapsible {
  summary {
    display: flex;
    list-style: none;
    padding: 1rem;
    cursor: pointer;

    &::before {
      content: '+';
      display: inline-block;
      margin-right: 0.5rem;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    aside {
      margin: -1rem 0;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  &[open] summary::before { transform: rotate(45deg); }
}
</style>
