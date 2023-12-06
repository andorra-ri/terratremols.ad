<template>
  <section id="faq" class="content">
    <div class="columns">
      <div class="column">
        <h2>{{ message('faq.title') }}</h2>
        <p>{{ message('faq.caption') }}</p>
      </div>
      <div class="column column--wide">
        <details
          v-for="question, i in faq[locale]"
          :key="i"
          :open="i === 0"
          class="collapsible">
          <summary><strong>{{ question.question }}</strong></summary>
          <p>{{ question.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import faq from '/@/assets/faq.yaml';

const { message, locale } = useI10n();
</script>

<style lang="scss" scoped>
.collapsible summary + p {
  border-left: 1px solid #8884;
  margin: 0 0 0 0.35rem;
  padding-left: 1rem;
}
</style>
