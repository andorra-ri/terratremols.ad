<template>
  <footer>
    <div class="columns">
      <div class="column column--wide">
        <img src="/@/assets/images/logo.svg" class="logo">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quia officia quibusdam cupiditate reprehenderit et laboriosam.</p>
      </div>
      <div class="column">
        <h4>Learn</h4>
        <link-list :links="learn" />
      </div>
      <div class="column">
        <h4>About</h4>
        <link-list :links="about" />
      </div>
      <div class="column">
        <h4>Contact</h4>
        <link-list :links="contact" />
      </div>
    </div>

    <p class="copyright">
      © 2022 &middot; Andorra Recerca + Innovació. All rights reserved.
    </p>
  </footer>
</template>

<script>
import { LinkList } from '/@/components';
import { footer } from '/@/config.yaml';

export default {
  name: 'SectionFooter',
  components: { LinkList },
  setup() {
    return { ...footer };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  height: 2rem;
  margin-bottom: 1rem;
  display: block;
}
</style>
