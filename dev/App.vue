<template>
  <v-app id="app">
    <v-main class="background">
      <v-container class="container--limited my-4 my-md-12">
        <app-heading />
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <install-card class="mb-6" />
            <props-card v-model="inputProps" />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <input-card
              :input-props="cleanedInputProps"
              :class="{ 'input-card--sticky': hasStickyInputCard }"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeading from './components/AppHeading.vue';
import InputCard from './components/InputCard.vue';
import InstallCard from './components/InstallCard.vue';
import PropsCard from './components/PropsCard.vue';

declare global {
  interface Window {
    Cypress: boolean;
  }
}

export default Vue.extend({
  name: 'App',
  components: { AppHeading, InputCard, InstallCard, PropsCard },
  data: () => ({
    inputProps: {
      countryIconMode: 'svg',
      displayFormat: null,
    } as Record<string, unknown>,
  }),
  computed: {
    hasStickyInputCard(): boolean {
      return !window.Cypress;
    },
    cleanedInputProps(): Record<string, unknown> {
      const cleanedInputProps = {} as Record<string, unknown>;

      Object.keys(this.inputProps).forEach((prop) => {
        if (this.inputProps[prop] !== undefined
          && this.inputProps[prop] !== null
          && this.inputProps[prop] !== ''
        ) {
          cleanedInputProps[prop] = this.inputProps[prop];
        }
      });

      return cleanedInputProps;
    },
  },
});
</script>

<style
  lang="scss"
  scoped
>
  .container--limited {
    max-width: 1185px !important;
  }

  .input-card--sticky {
    position: sticky;
    top: 24px;
  }
</style>
