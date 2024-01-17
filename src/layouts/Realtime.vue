<template>
  <section id="realtime">
    <h2>{{ message('realtime.title') }}</h2>
    <p>{{ message('realtime.caption', { interval: MINUTES }) }}</p>
    <div class="content">
      <div class="seismograms">
        <article
          v-for="station in stations.STATIONS"
          :key="station.id"
          class="seismogram">
          <a
            :href="`${config.seismogramsURL}${station.id}.latest.png#${timestamp}`"
            target="_blank"
            class="seismogram">
            {{ station.name }}
            <img :src="`${config.seismogramsURL}${station.id}.latest.png#${timestamp}`">
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useI10n } from '../composables';
import config from '/@/config.yaml';
import stations from '/@/assets/stations.yaml';

const { message } = useI10n();

const { interval: MINUTES } = config.realtime;

const timestamp = ref(Date.now());
const updater = setTimeout(() => {
  timestamp.value = Date.now();
}, MINUTES * 60_000);

onUnmounted(() => clearTimeout(updater));
</script>

<style lang="scss" scoped>
#realtime {
  text-align: center;

  .seismograms {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 3rem 0;

    .seismogram {
      text-align: center;

      img {
        width: 100%;
      }
    }
  }
}
</style>
