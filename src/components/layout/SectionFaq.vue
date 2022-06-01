<template>
  <section id="faq">
    <div class="columns">
      <div class="column">
        <h2>Frequent Asked Questions</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="column column--wide">
        <details
          v-for="(question, i) in faq"
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

<script>
import faq from '/@/assets/faq.yaml';

export default {
  name: 'SectionFaq',
  setup() {
    return { faq };
  },
};
</script>
