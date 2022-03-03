<template>
  <footer data-cy="app-header">
    <p class="text-body-1 text-center mb-0">
      Made by
      <a
        href="https://github.com/paul-thebaud"
        rel="noopener"
        target="_blank"
      >
        Paul Thébaud
        <span class="d-sr-only">
          (open in new tab)
        </span>
      </a>
    </p>
    <div class="d-flex align-center justify-center flex-wrap">
      <span class="text-body-1 mb-3">
        Proudly supported by
      </span>
      <a
        href="https://coworkhit.com"
        rel="noopener"
        target="_blank"
      >
        <img
          :src="logoCoWorkHit"
          alt="CoWork'HIT"
          height="60"
        >
        <span class="d-sr-only">
          (open in new tab)
        </span>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import logoCoWorkHitDark from '../assets/logo-coworkhit-dark.png';
import logoCoWorkHitLight from '../assets/logo-coworkhit-light.png';

export default Vue.extend({
  name: 'AppFooter',
  computed: {
    logoCoWorkHit(): string {
      return this.$vuetify.theme.dark ? logoCoWorkHitDark : logoCoWorkHitLight;
    },
  },
});
</script>
