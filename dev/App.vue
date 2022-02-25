<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <h1 class="text-h4 text-md-h2 text-center my-8">
          VPhoneInput
        </h1>
        <v-row>
          <v-col sm="6">
            <v-card>
              <v-card-title>
                <h2 class="text-h6">Input preview</h2>
              </v-card-title>
              <v-card-text>
                <v-phone-input
                  v-model="value"
                  v-bind="inputProps"
                />
              </v-card-text>
              <v-card-title>
                <h2 class="text-h6">Props</h2>
              </v-card-title>
              <v-card-text>
              <pre :class="$vuetify.theme.dark ? 'blue-grey darken-4' : 'blue lighten-5'" class="rounded pa-2"><code
                class="transparent pa-0 ma-0"
                v-text="humanReadableProps"
              /></pre>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="6">
            <props-editor-card v-model="inputProps" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PropsEditorCard from './PropsEditorCard.vue';

@Component({ components: { PropsEditorCard } })
export default class App extends Vue {
  value = '';

  inputProps = {};

  get humanReadableProps() {
    return JSON.stringify({
      value: this.value,
      ...this.inputProps,
    }, null, 2);
  }
}
</script>
