<template>
  <v-app id="app">
    <v-main class="background">
      <v-container class="my-4 my-md-12">
        <div>
          <h1 class="text-h4 text-md-h2 text-center mb-4">
            VPhoneInput
          </h1>
          <p class="text-body-1 text-md-h5 text-center mb-4">
            International phone field for Vuetify 2.0 and Vue JS 2.
          </p>
          <div class="d-flex align-center justify-center flex-wrap mb-4 mb-md-8">
            <v-btn
              v-for="(url, name) in links"
              :key="`links-${name}`"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              large
              text
            >
              {{ name }}
              <v-icon
                role="img"
                aria-label="Open in new tab"
                aria-hidden="false"
                right
                small
                v-text="mdiOpenInNew"
              />
            </v-btn>
          </div>
        </div>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <input-card :input-props="cleanedInputProps" />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <props-card v-model="inputProps" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { mdiOpenInNew } from '@mdi/js';
import Vue from 'vue';
import InputCard from './components/InputCard.vue';
import PropsCard from './components/PropsCard.vue';

export default Vue.extend({
  name: 'App',
  components: { PropsCard, InputCard },
  data: () => ({
    mdiOpenInNew,
    inputProps: {} as Record<string, unknown>,
  }),
  computed: {
    links() {
      return {
        NPM: 'https://www.npmjs.com/package/v-phone-input',
        GitHub: 'https://github.com/paul-thebaud/v-phone-input',
      };
    },
    cleanedInputProps(): Record<string, unknown> {
      const cleanedInputProps = {} as Record<string, unknown>;

      Object.keys(this.inputProps).forEach((prop) => {
        if (this.inputProps[prop] !== '') {
          cleanedInputProps[prop] = this.inputProps[prop];
        }
      });

      return cleanedInputProps;
    },
  },
});
</script>
