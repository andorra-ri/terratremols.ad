<template>
  <teleport :to="`#${props.to}`">
    <div class="seism-popup">
      <ul class="metrics">
        <li class="seism-popup__location">
          <RemixIcon name="map-pin" />
          {{
            message('seism.epicenter', {
              distance: round(props.seism.from.distance, 1),
              direction: message(`seism.direction.${props.seism.from.direction}`),
              name: props.seism.from.name,
            })
          }}
        </li>
        <li class="seism-popup__magnitude">
          <RemixIcon name="focus" />
          {{ message('seism.magnitude', props.seism) }}
        </li>
        <li class="seism-popup__depth">
          <RemixIcon name="download" />
          {{ message('seism.depth', props.seism) }}
        </li>
        <li class="seism-popup__date">
          <RemixIcon name="calendar-event" />
          {{ formatDate(props.seism.datetime) }}
        </li>
        <li class="seism-popup__time">
          <RemixIcon name="time" />
          {{ message('seism.time', { time: formatTime(props.seism.datetime) }) }}
        </li>
      </ul>
      <a
        v-if="report"
        :href="props.report"
        class="btn btn--flat block">
        {{ message('survey.results') }}
      </a>
      <a
        v-else
        :href="config.surveyURL"
        target="blank"
        class="btn block">
        {{ message('survey.fill') }}
      </a>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import { RemixIcon } from '/@/components';
import type { Seism } from '/@/types';
import config from '/@/config.yaml';

const { message, formatDate, formatTime } = useI10n();

const round = (num: number, decimals = 0) => +num.toFixed(decimals);

const props = defineProps<{
  seism: Seism;
  report: string | undefined;
  to: string,
}>();
</script>

<style lang="scss" scoped>
.seism-popup {
  margin: 1rem 0.75rem;
  font-size: 1rem;

  .metrics{
    margin: 1.5rem 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.75rem 0 !important;

      .icon {
        flex: 0 0 1em;
        height: 1em;
        opacity: 0.5;
      }
    }
  }
}
</style>
