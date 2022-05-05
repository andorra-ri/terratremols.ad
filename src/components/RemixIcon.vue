<template>
  <svg class="icon">
    <use :xlink:href="`/@/assets/images/icons.svg#${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'RemixIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
