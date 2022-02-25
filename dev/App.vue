<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <h1 class="text-h4 text-md-h2 text-center my-8">
          VPhoneInput
        </h1>
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
