<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import InputCard from './components/InputCard.vue';
import InstallCard from './components/InstallCard.vue';
import PropsCard from './components/PropsCard.vue';
import filterObject from './utils/filterObject';

export default defineComponent({
  components: {
    AppFooter,
    AppHeader,
    InputCard,
    InstallCard,
    PropsCard,
  },
  setup() {
    const stickyInputCard = !(window as any as { Cypress: boolean }).Cypress;

    const guess = !!new URL(window.location.href).searchParams.get('guess');

    const inputProps = ref({
      guessCountry: guess ? true : undefined,
      countryIconMode: 'svg',
      displayFormat: 'national',
      variant: 'filled',
      density: 'default',
    } as Record<string, unknown>);

    const nonEmptyInputProps = computed(() => filterObject(inputProps.value, (value) => (
      value !== undefined && value !== null && value !== ''
    )));

    return {
      stickyInputCard,
      inputProps,
      nonEmptyInputProps,
    };
  },
});
</script>

<template>
  <v-app id="app">
    <v-main class="background">
      <v-container class="container--limited my-4 my-md-12">
        <app-header class="mb-4 mb-md-8" />
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <install-card
              :input-props="nonEmptyInputProps"
              class="mb-6"
            />
            <props-card v-model="inputProps" />
          </v-col>
          <v-col
            class="position-relative"
            cols="12"
            md="6"
          >
            <input-card
              :input-props="nonEmptyInputProps"
              :class="{ 'card--sticky': stickyInputCard }"
            />
          </v-col>
        </v-row>
        <app-footer class="mt-4 mt-md-8" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style
  lang="scss"
  scoped
>
  #app {
    overflow: inherit !important;

    .container--limited {
      max-width: 1256px !important;
    }

    .card--sticky {
      position: sticky;
      top: 24px;
    }
  }
</style>
