<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h6">Input preview</h2>
    </v-card-title>
    <v-card-text>
      <v-phone-input
        v-model="inputValue"
        v-bind="inputProps"
      />
      <v-sheet
        :color="$vuetify.theme.dark ? 'blue-grey darken-4' : 'blue lighten-5'"
        class="text-body-1 pa-2"
        rounded
      >
        Value: {{ inputValue }}
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class InputCard extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly inputProps!: Record<string, any>;

  inputValue = '';
};
</script>
