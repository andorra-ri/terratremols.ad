<template>
  <footer>
    <div class="columns content">
      <div class="column column--wide">
        <img src="/@/assets/images/logo_ari.png" class="logo">
        <p>{{ message('description') }}</p>
      </div>
      <div class="column">
        <h4>{{ message('nav.learn') }}</h4>
        <LinkList :links="config.footer.learn" />
      </div>
      <div class="column">
        <h4>{{ message('nav.act') }}</h4>
        <LinkList :links="config.footer.act" />
      </div>
      <div class="column">
        <h4>{{ message('nav.info') }}</h4>
        <LinkList :links="config.footer.info" />
      </div>
    </div>

    <p class="policies">
      <a href="https://ari.ad/politica-privadesa" target="blank">Política de Privadesa</a>
      &middot;
      <a href="https://ari.ad/politica-cookies" target="blank">Política de cookies</a>
      &middot;
      <a href="https://ari.ad/avis-legal" target="blank">Avís Legal</a>
    </p>

    <p class="copyright">
      &copy;
      {{ new Date().getFullYear() }}
      &middot;
      {{ message('copyright') }}
    </p>
  </footer>
</template>

<script setup lang="ts">
import { useI10n } from '/@/composables';
import { LinkList } from '/@/components';
import config from '/@/config.yaml';

const { message } = useI10n();
</script>

<style lang="scss" scoped>
.logo {
  height: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.policies {
  margin: 1rem;

  a { font-weight: normal; }
}
</style>
