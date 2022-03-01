<template>
  <div class="v-phone-input">
    <component
      :is="enableSearchingCountry ? 'v-autocomplete' : 'v-select'"
      ref="countryInput"
      v-model="lazyCountry"
      :label="computedCountryLabel"
      :aria-label="computedCountryAriaLabel"
      :items="sortedCountries"
      :autocomplete="enableSearchingCountry ? 'new-password' : undefined"
      :aria-autocomplete="enableSearchingCountry ? 'off' : undefined"
      :loading="loading || (!disableGuessLoading && guessingCountry)"
      :disabled="disabled"
      :readonly="readonly"
      :outlined="outlined"
      :filled="filled"
      :shaped="shaped"
      :flat="flat"
      :solo="solo"
      :solo-inverted="soloInverted"
      :rounded="rounded"
      :dense="dense"
      :item-text="getCountryText"
      item-value="iso2"
      class="v-phone-input__country"
      v-bind="countryProps"
    >
      <template #selection="selectionProps">
        <slot
          name="selection"
          v-bind="selectionProps"
        >
          <slot
            name="country-icon"
            :country="activeCountry"
            :decorative="false"
          >
            <template v-if="countryIconComponent">
              <component
                :is="countryIconComponent"
                :country="activeCountry"
                :decorative="false"
              />
            </template>
            <span
              v-else
              v-text="`+${activeCountry.dialCode}`"
            />
          </slot>
        </slot>
      </template>
      <template #item="itemProps">
        <slot
          name="item"
          v-bind="itemProps"
        >
          <v-list-item-icon v-if="countryIconComponent || $scopedSlots['country-icon']">
            <slot
              name="country-icon"
              :country="itemProps.item"
              :decorative="true"
            >
              <component
                :is="countryIconComponent"
                :country="itemProps.item"
                :decorative="true"
              />
            </slot>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="`${itemProps.item.name} +${itemProps.item.dialCode}`" />
          </v-list-item-content>
        </slot>
      </template>
    </component>
    <!-- eslint-disable vuejs-accessibility/no-autofocus -->
    <v-text-field
      ref="phoneInput"
      v-model="lazyValue"
      :label="computedLabel"
      :aria-label="computedAriaLabel"
      :placeholder="computedPlaceholder"
      :hint="computedHint"
      :persistent-hint="persistentHint"
      :persistent-placeholder="persistentPlaceholder"
      :rules="mergedRules"
      :append-icon="appendIcon"
      :append-outer-icon="appendOuterIcon"
      :prepend-inner-icon="prependInnerIcon"
      :prepend-icon="prependIcon"
      :clear-icon="clearIcon"
      :loading="loading"
      :disabled="disabled"
      :readonly="readonly"
      :outlined="outlined"
      :filled="filled"
      :shaped="shaped"
      :flat="flat"
      :solo="solo"
      :solo-inverted="soloInverted"
      :rounded="rounded"
      :dense="dense"
      :clearable="clearable"
      :autofocus="autofocus"
      :error="error"
      :error-count="errorCount"
      :error-messages="errorMessages"
      :messages="messages"
      :success="success"
      :success-messages="successMessages"
      :validate-on-blur="validateOnBlur"
      class="v-phone-input__phone"
      type="tel"
      v-bind="phoneProps"
    >
      <!-- eslint-enable vuejs-accessibility/no-autofocus -->
      <template #append>
        <slot name="append" />
      </template>
      <template #append-outer>
        <slot name="append-outer" />
      </template>
      <template #counter="counterProps">
        <slot
          name="counter"
          v-bind="counterProps"
        />
      </template>
      <template #label>
        <slot name="label" />
      </template>
      <template #message="messageProps">
        <slot
          name="message"
          v-bind="messageProps"
        />
      </template>
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #prepend-inner>
        <slot name="prepend-inner" />
      </template>
      <template #progress>
        <slot name="progress" />
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import VPhoneCountrySprite from '@/components/VPhoneCountrySprite';
import VPhoneCountrySvg from '@/components/VPhoneCountrySvg';
import { VPhoneInputRules } from '@/types/components';
import { Country, CountryGuesser, CountryIso2 } from '@/types/countries';
import { CountryIconMode, Message, MessageOptions, MessageResolver } from '@/types/options';
import { PhoneNumberFormat, PhoneNumberObject } from '@/types/phone';
import { getOption } from '@/utils/options';
import PhoneNumber from 'awesome-phonenumber';
import Vue, { PropType } from 'vue';
import { InputValidationRules } from 'vuetify';
import { VSelect, VTextField } from 'vuetify/lib';

export default Vue.extend({
  name: 'VPhoneInput',
  components: { VSelect, VTextField },
  inheritAttrs: false,
  props: {
    label: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('label'),
    },
    ariaLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('ariaLabel'),
    },
    countryLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('countryLabel'),
    },
    countryAriaLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('countryAriaLabel'),
    },
    placeholder: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('placeholder'),
    },
    hint: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('hint'),
    },
    invalidMessage: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('invalidMessage'),
    },
    persistentPlaceholder: {
      type: Boolean,
      default: () => getOption('persistentPlaceholder'),
    },
    persistentHint: {
      type: Boolean,
      default: () => getOption('persistentHint'),
    },
    appendIcon: {
      type: String,
      default: undefined,
    },
    appendOuterIcon: {
      type: String,
      default: undefined,
    },
    prependInnerIcon: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    clearIcon: {
      type: String,
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: undefined,
    },
    filled: {
      type: Boolean,
      default: undefined,
    },
    shaped: {
      type: Boolean,
      default: undefined,
    },
    flat: {
      type: Boolean,
      default: undefined,
    },
    solo: {
      type: Boolean,
      default: undefined,
    },
    soloInverted: {
      type: Boolean,
      default: undefined,
    },
    rounded: {
      type: Boolean,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: undefined,
    },
    errorCount: {
      type: [Number, String],
      default: undefined,
    },
    errorMessages: {
      type: [Array, String],
      default: undefined,
    },
    messages: {
      type: [Array, String],
      default: undefined,
    },
    success: {
      type: Boolean,
      default: undefined,
    },
    successMessages: {
      type: [Array, String],
      default: undefined,
    },
    validateOnBlur: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array as PropType<VPhoneInputRules>,
      default: () => [],
    },
    countryIconMode: {
      type: [String, Object] as PropType<CountryIconMode>,
      default: () => getOption('countryIconMode'),
    },
    allCountries: {
      type: Array as PropType<Country[]>,
      default: () => getOption('allCountries'),
    },
    preferredCountries: {
      type: Array as PropType<CountryIso2[]>,
      default: () => getOption('preferredCountries'),
    },
    onlyCountries: {
      type: Array as PropType<CountryIso2[]>,
      default: () => getOption('onlyCountries'),
    },
    ignoreCountries: {
      type: Array as PropType<CountryIso2[]>,
      default: () => getOption('ignoreCountries'),
    },
    defaultCountry: {
      type: String as PropType<CountryIso2 | undefined>,
      default: () => getOption('defaultCountry'),
    },
    countryGuesser: {
      type: Object as PropType<CountryGuesser>,
      default: () => getOption('countryGuesser'),
    },
    disableGuessingCountry: {
      type: Boolean,
      default: () => getOption('disableGuessingCountry'),
    },
    disableGuessLoading: {
      type: Boolean,
      default: () => getOption('disableGuessLoading'),
    },
    enableSearchingCountry: {
      type: Boolean,
      default: () => getOption('enableSearchingCountry'),
    },
    displayFormat: {
      type: String as PropType<PhoneNumberFormat>,
      default: () => getOption('displayFormat'),
    },
    value: {
      type: String,
      default: '',
    },
    countryProps: {
      type: Object,
      default: () => ({}),
    },
    phoneProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      guessingCountry: false,
      mergedRules: [] as InputValidationRules,
      lazyCountry: undefined as CountryIso2 | undefined,
      lazyValue: this.value || '',
      lazyPhone: { number: { input: '' } } as PhoneNumberObject,
    };
  },
  computed: {
    countryIconComponent() {
      switch (this.countryIconMode) {
        case 'svg':
          return VPhoneCountrySvg;
        case 'sprite':
          return VPhoneCountrySprite;
        default:
          return this.countryIconMode;
      }
    },
    fallbackCountry(): Country {
      return this.findCountry(this.defaultCountry)
        || this.findCountry(this.preferredCountries[0])
        || this.filteredCountries[0];
    },
    activeCountry(): Country {
      return this.findCountry(this.lazyCountry)
        || this.fallbackCountry;
    },
    allCountriesByIso2(): Record<CountryIso2, Country> {
      const allCountriesByIso2 = {} as Record<CountryIso2, Country>;

      this.allCountries.forEach((country) => {
        allCountriesByIso2[country.iso2] = country;
      });

      return allCountriesByIso2;
    },
    filteredCountries(): Country[] {
      if (this.onlyCountries.length) {
        return this.getCountries(this.onlyCountries);
      }

      if (this.ignoreCountries.length) {
        return this.allCountries.filter(
          ({ iso2 }) => this.ignoreCountries.indexOf(iso2.toUpperCase()) === -1
            && this.ignoreCountries.indexOf(iso2.toLowerCase()) === -1,
        );
      }

      return this.allCountries;
    },
    sortedCountries(): Country[] {
      const preferredCountries = this.getCountries(this.preferredCountries)
        .map((country) => ({ ...country, preferred: true }));

      return [...preferredCountries, ...this.filteredCountries];
    },
    phoneExample(): string {
      return this.formatPhoneNumber(
        PhoneNumber.getExample(this.activeCountry.iso2).toJSON(),
      );
    },
    computedLabel(): Message {
      return this.computeMessage(this.label, { example: this.phoneExample });
    },
    computedAriaLabel(): Message {
      return this.computeMessage(this.ariaLabel, { example: this.phoneExample });
    },
    messageOptions(): MessageOptions {
      return {
        label: this.computedLabel || this.computedAriaLabel,
        example: this.phoneExample,
      };
    },
    computedCountryLabel(): Message {
      return this.computeMessage(this.countryLabel, this.messageOptions);
    },
    computedCountryAriaLabel(): Message {
      return this.computeMessage(this.countryAriaLabel, this.messageOptions);
    },
    computedPlaceholder(): Message {
      return this.computeMessage(this.placeholder, this.messageOptions);
    },
    computedHint(): Message {
      return this.computeMessage(this.hint, this.messageOptions);
    },
    computedInvalidMessage(): Message {
      return this.computeMessage(this.invalidMessage, this.messageOptions);
    },
  },
  watch: {
    invalidMessage: 'onInvalidMessageChange',
    rules: {
      handler: 'onRulesChange',
      immediate: true,
      deep: true,
    },
    displayFormat: 'onDisplayFormatChange',
    value: 'onValueChange',
    lazyCountry: 'onLazyCountryChange',
    lazyValue: 'onLazyValueChange',
    lazyPhone: {
      handler: 'onLazyPhoneChange',
      deep: true,
    },
  },
  mounted(): void {
    this.onLazyValueChange();
    this.$nextTick(() => {
      this.initializeCountry();
    });
  },
  methods: {
    onInvalidMessageChange() {
      this.onRulesChange();
      if (this.$refs.phoneInput) {
        (this.$refs.phoneInput as unknown as { validate: () => void }).validate();
      }
    },
    onRulesChange() {
      const rules = this.rules.map((rule) => (
        typeof rule === 'function'
          ? (() => rule(this.lazyValue, this.lazyPhone, this.messageOptions))
          : rule
      ));
      if (!this.computedInvalidMessage) {
        this.mergedRules = rules;
      } else {
        this.mergedRules = [
          ...rules,
          () => !this.lazyValue || this.lazyPhone.valid || (this.computedInvalidMessage as string),
        ];
      }
    },
    onDisplayFormatChange(): void {
      if (this.lazyPhone.valid) {
        this.lazyValue = this.formatPhoneNumber(this.lazyPhone);
      }
    },
    onValueChange() {
      if (this.value !== this.lazyPhone.number.input && this.value !== this.lazyPhone.number.e164) {
        this.lazyValue = this.value || '';
      }
    },
    onLazyCountryChange(_: CountryIso2, oldLazyCountry: CountryIso2) {
      if (this.lazyCountry) {
        this.guessingCountry = false;
      } else {
        this.$nextTick(() => {
          if (!this.lazyCountry) {
            this.lazyCountry = oldLazyCountry;
          }
        });
      }

      this.onLazyCountryOrValueChange();
    },
    onLazyValueChange() {
      const lazyCountry = this.lazyValue.startsWith('+') ? undefined : this.lazyCountry;
      const lazyPhone = this.makePhoneNumber(this.lazyValue, lazyCountry);
      const iso2 = lazyPhone.regionCode;
      if (iso2 && this.lazyCountry !== iso2) {
        this.lazyCountry = iso2;
      }

      this.onLazyCountryOrValueChange();
    },
    onLazyCountryOrValueChange() {
      this.lazyPhone = this.makePhoneNumber(this.lazyValue, this.lazyCountry);

      if (this.lazyPhone.valid) {
        this.lazyValue = this.formatPhoneNumber(this.lazyPhone);
      }
    },
    onLazyPhoneChange() {
      const newValue = this.lazyPhone.number.e164 || this.lazyPhone.number.input;
      if (newValue !== this.value) {
        this.$emit('input', newValue);
      }
    },
    makePhoneNumber(value?: string, iso2?: CountryIso2): PhoneNumberObject {
      return PhoneNumber((value || '').trim(), iso2).toJSON();
    },
    formatPhoneNumber(phone: PhoneNumberObject): string {
      return phone.number[this.displayFormat] || phone.number.input;
    },
    async initializeCountry(): Promise<void> {
      if (this.lazyCountry) {
        return;
      }

      if (!this.disableGuessingCountry) {
        this.guessingCountry = true;

        const guessedCountry = this.findCountry(await this.countryGuesser.guess());
        if (!this.lazyCountry && guessedCountry) {
          this.lazyCountry = guessedCountry.iso2;
        }

        this.guessingCountry = false;
      }

      this.lazyCountry = this.lazyCountry || this.activeCountry.iso2;
    },
    getCountryText(country: Country): string {
      return `${country.name} ${country.iso2} ${country.dialCode}`;
    },
    /**
     * Get a list of countries matching given ISO2 codes.
     *
     * @param {CountryIso2[]} countriesIso2
     *
     * @returns {Country[]}
     */
    getCountries(countriesIso2 = [] as CountryIso2[]): Country[] {
      return countriesIso2
        .map((iso2) => this.findCountry(iso2))
        .filter((c): c is Country => !!c);
    },
    /**
     * Find a country using its ISO2 code.
     *
     * @param {CountryIso2 | undefined} iso2
     *
     * @returns {Country | undefined}
     */
    findCountry(iso2 = undefined as CountryIso2 | undefined): Country | undefined {
      return this.allCountriesByIso2[(iso2 || '').toUpperCase()];
    },
    computeMessage(message: MessageResolver, options: MessageOptions): Message {
      if (typeof message === 'function') {
        return message(options);
      }

      return message;
    },
  },
});
</script>

<style
  lang="scss"
  src="../scss/v-phone-input.scss"
/>
