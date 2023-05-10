<template>
  <section id="seismology">
    <div class="columns">
      <div class="column">
        <h2>{{ message('seismology.title') }}</h2>
        <p>{{ message('seismology.caption') }}</p>
      </div>
      <div class="column column--wide">
        <ul>
          <li v-for="resource in config.seismology.resources" :key="resource.name">
            <a :href="resource.url" target="blank">
              <RemixIcon :name="resource.icon" />
              {{ message(`seismology.resources.${resource.id}.title`) }}
            </a>
            <p class="note">
              {{ message(`seismology.resources.${resource.id}.caption`) }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import { RemixIcon } from '/@/components';
import config from '/@/config.yaml';

const { message } = useI10n();
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
