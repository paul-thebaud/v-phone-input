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
          <div class="d-flex align-center mt-2 pa-4 background rounded">
            <pre class="flex-grow-1"><code
              class="pa-0 transparent"
              v-text="customOptionsJson"
            /></pre>
            <v-btn
              title="Copy options to clipboard"
              icon
              @click="onCopyOptionsJson"
            >
              <v-icon>
                mdi-content-copy
              </v-icon>
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-slide-y-transition leave-absolute>
      <v-card-text
        v-if="copied"
        class="pt-0"
      >
        <v-alert
          type="success"
          class="mb-0"
          close-icon="mdi-close"
          border="left"
          dismissible
          text
          @input="onCopiedClose"
        >
          Options copied to clipboard.
        </v-alert>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script lang="ts">
import { countries, DEFAULT_OPTIONS } from '@/entry.esm';
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
    copied: false,
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
    onCopyOptionsJson() {
      this.$copyText(this.customOptionsJson);

      this.copied = true;
    },
    onCopiedClose() {
      this.copied = false;
    },
  },
});
</script>
