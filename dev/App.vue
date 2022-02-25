<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <div class="my-8">
          <h1 class="text-h4 text-md-h2 text-center mb-4">
            VPhoneInput
          </h1>
          <p class="text-body-1 text-md-h5 text-center">
            International phone field for Vuetify 2.0 and Vue JS 2.
          </p>
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
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PropsCard from './PropsCard.vue';
import InputCard from './InputCard.vue';

@Component({ components: { InputCard, PropsCard } })
export default class App extends Vue {
  inputProps = {} as Record<string, any>;

  get cleanedInputProps() {
    const cleanedInputProps = {} as Record<string, any>;

    Object.keys(this.inputProps).forEach((prop) => {
      if (this.inputProps[prop] !== '') {
        cleanedInputProps[prop] = this.inputProps[prop];
      }
    });

    return cleanedInputProps;
  }
}
</script>
