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

.policies {
  margin: 1rem;

  a { font-weight: normal; }
}
</style>
