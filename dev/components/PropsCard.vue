<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h6">
        Configuration
      </h2>
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
          v-for="(fieldComponent, prop) in filteredInputPropsFields"
          :key="`inputs-${prop}`"
          cols="12"
          sm="6"
        >
          <component
            :is="fieldComponent"
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
import Vue, { PropType } from 'vue';
import { VSwitch, VTextField } from 'vuetify/lib';
import { titleCase } from '../utils';

export default Vue.extend({
  name: 'PropsCard',
  props: {
    inputProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  data() {
    return {
      titleCase,
      search: '',
      inputPropsSynced: this.inputProps,
      inputPropsFields: {
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
      } as Record<string, unknown>,
    };
  },
  computed: {
    filteredInputPropsFields(): Record<string, unknown> {
      if (!this.search) {
        return this.inputPropsFields;
      }

      const inputPropsFields = {} as Record<string, unknown>;
      Object.keys(this.inputPropsFields).forEach((prop) => {
        if (prop.indexOf(this.search) !== -1) {
          inputPropsFields[prop] = this.inputPropsFields[prop];
        }
      });

      return inputPropsFields;
    },
  },
  watch: {
    inputProps: 'onInputPropsChange',
    inputPropsSynced: 'onInputPropsSyncedChange',
  },
  methods: {
    onInputPropsChange(inputProps: Record<string, unknown>): void {
      this.inputPropsSynced = inputProps;
    },
    onInputPropsSyncedChange(inputProps: Record<string, unknown>): void {
      this.$emit('input', inputProps);
    },
  },
});
</script>
