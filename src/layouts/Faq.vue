<template>
  <section id="faq">
    <div class="columns">
      <div class="column">
        <h2>{{ message('faq.title') }}</h2>
        <p>{{ message('faq.caption') }}</p>
      </div>
      <div class="column column--wide">
        <details
          v-for="question, i in faq[locale]"
          :key="i"
          :open="true"
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
