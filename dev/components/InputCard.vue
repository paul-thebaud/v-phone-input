<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h5">
        Input preview
      </h2>
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
        color="background"
        rounded
        dense
      >
        <v-list-item
          v-for="(value, name) in inputInfo"
          :key="`info-${name}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="titleCase(name)" />
            <v-list-item-subtitle v-text="value" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { countries } from '@/entry.esm';
import PhoneNumber from 'awesome-phonenumber';
import Vue, { PropType } from 'vue';
import { titleCase } from '../utils';

export default Vue.extend({
  name: 'InputCard',
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
  },
  methods: {
    onInputValue(value: string): void {
      this.inputValue = value;
    },
  },
});
</script>
