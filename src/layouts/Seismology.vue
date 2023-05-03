<template>
  <section id="seismology">
    <div class="columns">
      <div class="column">
        <h2>Seismology</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="column column--wide">
        <ul>
          <li v-for="doc in config.seismology.docs" :key="doc.name">
            <a :href="doc.url" target="blank">
              <RemixIcon :name="doc.icon" />
              {{ doc.name }}
            </a>
            <p class="note">{{ doc.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RemixIcon } from '/@/components';
import config from '/@/config.yaml';
</script>

<style lang="scss" scoped>
#seismology {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--xxl);

    .icon {
      height: var(--xl);
      width: var(--xl);
      display: block;
      margin-bottom: var(--s);
    }
  }
}
</style>
