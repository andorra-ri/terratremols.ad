<template>
  <div class="banner">
    <div class="content">
      <div class="columns">
        <header class="column">
          <h2>{{ message('survey.title') }}</h2>
          <p>{{ message('survey.caption') }}</p>
        </header>
        <div class="column buttons">
          <a :href="config.surveyURL" class="btn" target="blank">Emplenar enquesta</a>
          <a :href="config.methodologyPDF" class="btn ghost" target="blank">Metodologia</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import config from '/@/config.yaml';

const { message } = useI10n();
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

header.column { flex: 1 0 fit-content; }

.buttons {
  flex: 1 0 fit-content;
  display: flex;
  gap: 1rem;
}

.btn {
  background: #fff;
  color: var(--color-primary);
  white-space: nowrap;

  &.ghost {
    background: transparent;
    color: #fff;
    box-shadow: inset 0 0 0 1.5px #fff;
  }
}
</style>
