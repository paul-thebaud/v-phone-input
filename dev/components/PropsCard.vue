<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h5">
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
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row role="list">
        <v-col
          v-for="(fieldComponent, prop) in filteredInputPropsFields"
          :key="`inputs-${prop}`"
          role="listitem"
          cols="12"
          sm="6"
        >
          <component
            :is="fieldComponent"
            v-model="inputPropsSynced[prop]"
            :label="titleCase(prop)"
            hide-details
            v-bind="inputPropsFieldsAttrs[prop] || {}"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { VSelect, VSwitch, VTextField } from 'vuetify/lib';
import { titleCase } from '../utils';

export default Vue.extend({
  name: 'PropsCard',
  props: {
    value: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  data() {
    return {
      titleCase,
      search: '',
      inputPropsSynced: this.value,
      inputPropsFields: {
        countryIconMode: VSelect,
        displayFormat: VSelect,
        label: VTextField,
        ariaLabel: VTextField,
        countryLabel: VTextField,
        countryAriaLabel: VTextField,
        placeholder: VTextField,
        persistentPlaceholder: VSwitch,
        hint: VTextField,
        persistentHint: VSwitch,
        invalidMessage: VTextField,
        enableSearchingCountry: VSwitch,
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
      } as Record<string, unknown>,
      inputPropsFieldsAttrs: {
        countryIconMode: {
          items: [
            { value: null, text: 'None (default)' },
            { value: 'svg', text: 'SVG (using flag-icons)' },
            { value: 'sprite', text: 'CSS sprite (using world-flags-sprite)' },
          ],
        },
        displayFormat: {
          items: [
            { value: null, text: 'National (default)' },
            { value: 'e164', text: 'E164' },
            { value: 'international', text: 'International' },
            { value: 'significant', text: 'Significant' },
          ],
        },
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
    value: 'onValueChange',
    inputPropsSynced: 'onInputPropsSyncedChange',
  },
  methods: {
    onValueChange(value: Record<string, unknown>): void {
      this.inputPropsSynced = value;
    },
    onInputPropsSyncedChange(inputProps: Record<string, unknown>): void {
      this.$emit('input', inputProps);
    },
  },
});
</script>
