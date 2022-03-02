<template>
  <v-card data-cy="input-card">
    <v-card-title>
      <h2 class="text-h5">
        Input preview
      </h2>
    </v-card-title>
    <v-card-subtitle>
      You can try the input and copy plugin options here.
    </v-card-subtitle>
    <v-card-text>
      <v-phone-input
        :value="inputValue"
        v-bind="inputProps"
        @input="onInputValue"
      />
    </v-card-text>
    <v-divider role="presentation" />
    <v-list dense>
      <v-list-item
        v-for="(value, name) in inputInfo"
        :key="`info-${name}`"
      >
        <v-list-item-content>
          <v-list-item-title v-text="titleCase(name)" />
          <v-list-item-subtitle v-text="value" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Options JSON</v-list-item-title>
          <v-list-item-subtitle>
            Use it with <code>Vue.use(VuetifyPhoneInput, options)</code>
          </v-list-item-subtitle>
          <code-block
            name="Options JSON"
            :code="customOptionsJson"
            class="mt-2"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { countries, DEFAULT_OPTIONS } from '@/entry.esm';
import PhoneNumber from 'awesome-phonenumber';
import Vue, { PropType } from 'vue';
import { titleCase } from '../utils';
import CodeBlock from './CodeBlock.vue';

export default Vue.extend({
  name: 'InputCard',
  components: { CodeBlock },
  props: {
    inputProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  data: () => ({
    titleCase,
    inputValue: '',
  }),
  computed: {
    inputInfo() {
      const phone = PhoneNumber(this.inputValue);
      const iso2 = phone.getRegionCode();
      const country = countries.find((c) => c.iso2 === iso2)?.name || 'Unknown';

      return {
        value: this.inputValue || '-',
        valid: phone.isValid(),
        country,
      };
    },
    customOptions(): Record<string, unknown> {
      const customOptions = {} as Record<string, unknown>;
      Object.keys(this.inputProps).forEach((prop) => {
        if (prop in DEFAULT_OPTIONS && this.inputProps[prop]) {
          customOptions[prop] = this.inputProps[prop];
        }
      });

      return customOptions;
    },
    customOptionsJson(): string {
      return JSON.stringify(this.customOptions, null, 2);
    },
  },
  methods: {
    onInputValue(value: string): void {
      this.inputValue = value;
    },
  },
});
</script>
