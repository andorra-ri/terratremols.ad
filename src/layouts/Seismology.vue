<template>
  <section id="seismology" class="content">
    <div class="columns">
      <div class="column">
        <h2>{{ message('seismology.title') }}</h2>
        <p>{{ message('seismology.caption') }}</p>
      </div>
      <div class="column column--wide">
        <ul class="categories">
          <li v-for="resource in config.seismology.resources" :key="resource.name">
            <h3>
              <RemixIcon :name="resource.icon" />
              <strong>{{ message(`seismology.resources.${resource.id}.title`) }}</strong>
            </h3>
            <p class="note">
              {{ message(`seismology.resources.${resource.id}.caption`) }}
            </p>
            <ul class="documents">
              <li v-for="document in documents.get(resource.id)" :key="document.url">
                <a :href="document.url" target="blank">{{ document.name }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI10n } from '/@/composables';
import { RemixIcon } from '/@/components';
import store from '/@/store';
import { groupBy } from '/@/utils';
import config from '/@/config.yaml';

const { message } = useI10n();

const documents = computed(() => groupBy(store.state.docs, 'category'));

store.loadLearnDocuments();
</script>

<style lang="scss" scoped>
#seismology {
  ul.categories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;

    .icon {
      height: 2rem;
      width: 2rem;
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  h3 {
    color: var(--color-primary);
    font-size: 1.25rem;
  }

  .documents {
    margin: 1rem 0;

    li {
      margin: 0.5rem;
    }
  }
}
</style>
