<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h6">Configuration</h2>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Dark theme"
            hide-details
          />
        </v-col>
        <v-col
          v-for="prop in switchesProps"
          :key="`switches-${prop}`"
          cols="12"
          md="6"
        >
          <v-switch
            v-model="inputPropsSynced[prop]"
            :label="titleCase(prop)"
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, ModelSync } from 'vue-property-decorator';

@Component
export default class PropsEditorCard extends Vue {
  @ModelSync('inputProps')
  readonly inputPropsSynced!: Record<string, any>;

  get switchesProps() {
    return [
      'solo',
      'soloInverted',
      'outlined',
      'filled',
      'shaped',
      'flat',
      'rounded',
      'dense',
      'loading',
      'disabled',
      'hideCountryLabel',
      'disabledFetchingCountry',
      'disabledSearchingCountry',
      'disabledValidation',
    ];
  }

  titleCase(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');

    return result.charAt(0).toUpperCase() + result.slice(1);
  }
};
</script>
