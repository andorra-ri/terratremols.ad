<template>
  <section id="faq" class="content">
    <div class="columns">
      <div class="column">
        <h2>{{ message('faq.title') }}</h2>
        <I10n tag="p" path="faq.caption">
          <template #section>
            <a href="#seismology">{{ message('faq.caption_section') }}</a>
          </template>
        </I10n>
      </div>
      <div class="column column--wide">
        <Collapsible
          v-for="question, i in faq[locale]"
          :key="i"
          :open="i === 0">
          <template #title>
            <strong>{{ question.question }}</strong>
          </template>
          <p>{{ question.answer }}</p>
        </Collapsible>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Collapsible } from '/@/components';
import { useI10n } from '/@/composables';
import faq from '/@/assets/faq.yaml';

const { message, locale, I10n } = useI10n();
</script>

<style lang="scss" scoped>
.collapsible {
  p {
    border-left: 1px solid #8884;
    margin: 0 1.25rem 1rem;
    padding-left: 1rem;
  }
}
</style>
