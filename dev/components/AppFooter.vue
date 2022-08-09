<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useTheme } from 'vuetify';
import logoCoWorkHitDark from '../assets/logo-coworkhit-dark.png';
import logoCoWorkHitLight from '../assets/logo-coworkhit-light.png';

export default defineComponent({
  setup() {
    const theme = useTheme();

    const logoCoWorkHit = computed(() => (
      theme.global.current.value.dark ? logoCoWorkHitDark : logoCoWorkHitLight
    ));

    return { logoCoWorkHit };
  },
});
</script>

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
