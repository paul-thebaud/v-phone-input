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
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row
        role="list"
        dense
      >
        <v-col
          v-for="(fieldComponent, prop) in limitedInputPropsFields"
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
      <v-row v-if="!moreDisplayed">
        <v-col cols="12">
          <v-btn
            :aria-expanded="moreDisplayed ? 'true' : 'false'"
            aria-haspopup="true"
            block
            small
            text
            @click="onDisplayMore"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            Display more options
          </v-btn>
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
      moreDisplayed: false,
      inputPropsSynced: this.value,
      inputPropsFields: {
        countryIconMode: VSelect,
        displayFormat: VSelect,
        label: VTextField,
        placeholder: VTextField,
        countryLabel: VTextField,
        hint: VTextField,
        countryAriaLabel: VTextField,
        invalidMessage: VTextField,
        persistentPlaceholder: VSwitch,
        persistentHint: VSwitch,
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
    limitedInputPropsFields(): Record<string, unknown> {
      if (this.moreDisplayed) {
        return this.filteredInputPropsFields;
      }

      const inputPropsFields = {} as Record<string, unknown>;
      Object.keys(this.filteredInputPropsFields).slice(0, 4).forEach((prop) => {
        inputPropsFields[prop] = this.inputPropsFields[prop];
      });

      return inputPropsFields;
    },
  },
  watch: {
    search: 'onSearchChange',
    value: 'onValueChange',
    inputPropsSynced: 'onInputPropsSyncedChange',
  },
  methods: {
    onSearchChange(search: string): void {
      if (search) {
        this.onDisplayMore();
      }
    },
    onDisplayMore(): void {
      this.moreDisplayed = true;
    },
    onValueChange(value: Record<string, unknown>): void {
      this.inputPropsSynced = value;
    },
    onInputPropsSyncedChange(inputProps: Record<string, unknown>): void {
      this.$emit('input', inputProps);
    },
  },
});
</script>
