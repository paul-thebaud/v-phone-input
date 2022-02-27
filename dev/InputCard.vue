<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h6">Input preview</h2>
    </v-card-title>
    <v-divider role="presentation" />
    <v-card-text>
      <v-phone-input
        :value="inputValue"
        v-bind="inputProps"
        @input="onInputValue"
      />
    </v-card-text>
    <v-divider role="presentation" />
    <v-card-text>
      <v-list
        :color="$vuetify.theme.dark ? 'blue-grey darken-4' : 'blue lighten-5'"
        rounded
        dense
      >
        <v-list-item
          v-for="(resolver, name) in inputInfo"
          :key="`info-${name}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="titleCase(name)" />
            <v-list-item-subtitle v-text="resolver(inputValue)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import countries from '@/utils/countries';
import PhoneNumber from 'awesome-phonenumber';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { titleCase } from './utils';

@Component
export default class InputCard extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly inputProps!: Record<string, any>;

  titleCase = titleCase;

  inputValue = '';

  get inputInfo() {
    return {
      value: (value: string) => value,
      valid: (value: string) => PhoneNumber(value).isValid(),
      country: (value: string) => {
        const country = PhoneNumber(value).getRegionCode();
        if (!country) {
          return 'Unknown';
        }

        return countries.find((c) => c.iso2 === country)?.name;
      },
    };
  }

  onInputValue(value: string) {
    this.inputValue = value;
  }
};
</script>
