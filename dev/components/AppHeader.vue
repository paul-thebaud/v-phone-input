<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useDisplay } from 'vuetify';

export default defineComponent({
  setup() {
    const { xs } = useDisplay();

    const links = ref({
      NPM: {
        url: 'https://www.npmjs.com/package/v-phone-input',
        icon: 'mdi-npm',
      },
      GitHub: {
        url: 'https://github.com/paul-thebaud/v-phone-input',
        icon: 'mdi-github',
      },
      Docs: {
        url: 'https://github.com/paul-thebaud/v-phone-input#documentation',
        icon: 'mdi-book-open-variant',
      },
    });

    const size = computed(() => (xs.value ? 'small' : 'large'));

    return { size, links };
  },
});
</script>

<template>
  <header data-cy="app-header">
    <h1 class="text-h4 text-sm-h2 text-center mb-4">
      VPhoneInput
    </h1>
    <p class="text-body-1 text-sm-h5 text-center mb-4">
      International phone field for Vuetify 3 and Vue 3.
    </p>
    <div class="d-flex align-center justify-center flex-wrap">
      <v-btn
        v-for="({ url, icon }, name) in links"
        :key="`links-${name}`"
        :href="url"
        :size="size"
        target="_blank"
        rel="noopener"
        variant="text"
        class="mx-1"
      >
        <v-icon
          :icon="icon"
          size="24"
          start
        />
        {{ name }}
        <span class="d-sr-only">
          (open in new tab)
        </span>
      </v-btn>
    </div>
  </header>
</template>
