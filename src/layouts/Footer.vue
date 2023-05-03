<template>
  <footer>
    <div class="columns">
      <div class="column column--wide">
        <img src="/@/assets/images/logo.svg" class="logo">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quia officia quibusdam cupiditate reprehenderit et laboriosam.</p>
      </div>
      <div class="column">
        <h4>Learn</h4>
        <LinkList :links="config.footer.learn" />
      </div>
      <div class="column">
        <h4>About</h4>
        <LinkList :links="config.footer.about" />
      </div>
      <div class="column">
        <h4>Contact</h4>
        <LinkList :links="config.footer.contact" />
      </div>
    </div>

    <p class="copyright">
      © 2022 &middot; Andorra Recerca + Innovació. All rights reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
import { LinkList } from '/@/components';
import config from '/@/config.yaml';
</script>

<style lang="scss" scoped>
.logo {
  height: 2rem;
  margin-bottom: 1rem;
  display: block;
}
</style>
