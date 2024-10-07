<template>
  <footer>
    <div class="columns content">
      <div class="column column--wide">
        <img src="/@/assets/images/logo_ari.png" class="logo">
        <p>{{ message('description') }}</p>
      </div>
      <div class="column">
        <h4>{{ message('nav.learn') }}</h4>
        <LinkList :links="links.learn" />
      </div>
      <div class="column">
        <h4>{{ message('nav.act') }}</h4>
        <LinkList :links="links.act">
          <template #external="{ items }">
            <Popover width="20rem">
              <template v-for="[group, externals] in items" :key="group">
                <h4>{{ message(`nav.external.${group}`) }}</h4>
                <LinkList :links="externals" />
              </template>
              <template #target>
                <a href="#" @click.prevent>{{ message('nav.external._external') }}</a>
              </template>
            </Popover>
          </template>
        </LinkList>
      </div>
      <div class="column">
        <h4>{{ message('nav.info') }}</h4>
        <LinkList :links="links.info" />
      </div>
    </div>

    <aside class="legal">
      <p class="policies">
        <a href="https://www.ari.ad/images/pdf/ObservatoriRiscSismic/politica-de-privacitat.pdf" target="blank">Política de Privadesa</a>
        &middot;
        <a href="https://www.ari.ad/images/pdf/ObservatoriRiscSismic/politica-de-cookies.pdf" target="blank">Política de cookies</a>
        &middot;
        <a href="https://ari.ad/avis-legal" target="blank">Avís Legal</a>
      </p>
      <p class="copyright">
        &copy;
        {{ new Date().getFullYear() }}
        &middot;
        {{ message('copyright') }}
      </p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI10n } from '/@/composables';
import { LinkList, Popover } from '/@/components';
import { groupBy } from '/@/utils';
import store from '/@/store';
import config from '/@/config.yaml';

type Link = {
  id: string;
  url: string;
  target?: 'blank';
};

const { message } = useI10n();

const links = computed(() => {
  const { learn, act, info } = config.footer;
  return {
    learn: learn.map((link: Link) => ({ ...link, name: message(link.id) })),
    act: [
      ...act.map((link: Link) => ({ ...link, name: message(link.id) })),
      groupBy(store.state.links, 'sector'),
    ],
    info: info.map((link: Link) => ({ ...link, name: message(link.id) })),
  };
});

onMounted(store.loadLinks);
</script>

<style lang="scss" scoped>
.logo {
  height: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.legal {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 1.5rem 1rem 0.5rem;

  .copyright {
    font-size: 0.85rem;
    opacity: 0.5;
    text-align: center;
    margin: 1rem;
  }

  .policies {
    margin: 1rem;
    a { font-weight: normal; }
  }
}

/* iPad and below */
@media screen and (max-device-width : 1024px) {
  .legal { flex-direction: column; }
}

/* iPhone and below */
@media screen and (max-device-width : 480px) {
  .columns {
    flex-direction: column;
  }
}
</style>
