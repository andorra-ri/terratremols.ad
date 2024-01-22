<template>
  <div class="banner">
    <div class="content">
      <div class="columns">
        <div class="column ">
          <h2>{{ message('survey.title') }}</h2>
          <p>{{ message('survey.caption') }}</p>
        </div>
        <div class="column buttons">
          <a :href="config.surveyURL" class="btn" target="blank">Emplenar enquesta</a>
          <a :href="METHODOLOGY_PATH" class="btn ghost" target="blank">Metodologia</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import config from '/@/config.yaml';

const METHODOLOGY_PATH = '/docs/enquesta_sismica_metodologia.pdf';

const { message } = useI10n();
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  background: #fff;
  color: var(--color-primary);

  &.ghost {
    background: transparent;
    color: #fff;
    box-shadow: inset 0 0 0 1.5px #fff;
  }
}
</style>
