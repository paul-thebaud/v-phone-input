<template>
  <v-app id="app">
    <v-main class="background">
      <v-container class="my-4 my-md-12">
        <div>
          <h1 class="text-h4 text-sm-h2 text-center mb-4">
            VPhoneInput
          </h1>
          <p class="text-body-1 text-sm-h5 text-center mb-4">
            International phone field for Vuetify 2.0 and Vue JS 2.
          </p>
          <div class="d-flex align-center justify-center flex-wrap mb-4 mb-md-8">
            <v-btn
              v-for="({ url, icon }, name) in links"
              :key="`links-${name}`"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="mx-1"
              :small="$vuetify.breakpoint.xsOnly"
              :large="$vuetify.breakpoint.smAndUp"
              text
            >
              <v-icon
                size="24"
                left
              >
                {{ icon }}
              </v-icon>
              {{ name }}
            </v-btn>
          </div>
        </div>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <input-card
              :input-props="cleanedInputProps"
              class="input-card--sticky"
            />
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
import Vue from 'vue';
import InputCard from './components/InputCard.vue';
import PropsCard from './components/PropsCard.vue';

export default Vue.extend({
  name: 'App',
  components: { PropsCard, InputCard },
  data: () => ({
    inputProps: {
      countryIconMode: 'svg',
      displayFormat: null,
    } as Record<string, unknown>,
  }),
  computed: {
    links() {
      return {
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
      };
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
  .input-card--sticky {
    position: sticky;
    top: 24px;
  }
</style>
