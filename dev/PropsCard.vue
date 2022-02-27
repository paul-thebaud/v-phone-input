<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h6">Configuration</h2>
    </v-card-title>
    <v-divider role="presentation" />
    <v-card-text>
      <v-switch
        v-model="$vuetify.theme.dark"
        label="Dark theme"
      />
    </v-card-text>
    <v-divider role="presentation" />
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
          />
        </v-col>
        <v-col
          v-for="(inputComponent, prop) in filteredPropsInputs"
          :key="`inputs-${prop}`"
          cols="12"
          sm="6"
        >
          <component
            :is="inputComponent"
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
import { VSwitch, VTextField } from 'vuetify/lib';
import { titleCase } from './utils';

@Component
export default class PropsCard extends Vue {
  @ModelSync('inputProps')
  readonly inputPropsSynced!: Record<string, any>;

  titleCase = titleCase;

  search = '';

  get propsInputs(): Record<string, any> {
    return {
      label: VTextField,
      placeholder: VTextField,
      outlined: VSwitch,
      filled: VSwitch,
      shaped: VSwitch,
      flat: VSwitch,
      rounded: VSwitch,
      dense: VSwitch,
      solo: VSwitch,
      soloInverted: VSwitch,
      loading: VSwitch,
      disabled: VSwitch,
      readonly: VSwitch,
      error: VSwitch,
      success: VSwitch,
      hideCountryLabel: VSwitch,
      enableSearchingCountry: VSwitch,
      disableValidation: VSwitch,
    };
  }

  get filteredPropsInputs() {
    if (!this.search) {
      return this.propsInputs;
    }

    const propsInputs = {} as Record<string, any>;
    Object.keys(this.propsInputs).forEach((prop) => {
      if (prop.indexOf(this.search) !== -1) {
        propsInputs[prop] = this.propsInputs[prop];
      }
    });

    return propsInputs;
  }
};
</script>
