<template>
  <div class="v-phone-input">
    <component
      :is="enableSearchingCountry ? 'v-autocomplete' : 'v-select'"
      ref="countryInput"
      v-model="lazyCountry"
      :label="computedCountryLabel"
      :aria-label="computedCountryAriaLabel"
      :items="countriesItems"
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
      :background-color="backgroundColor"
      :color="color"
      :dark="dark"
      :light="light"
      :rounded="rounded"
      :dense="dense"
      :height="height"
      :loader-height="loaderHeight"
      :reverse="reverse"
      :single-line="singleLine"
      :item-text="getCountryText"
      item-value="iso2"
      class="v-phone-input__country"
      v-bind="computedCountryProps"
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
            <v-list-item-title>
              <slot
                name="country-name"
                :country="itemProps.item"
              >
                {{ itemProps.item.name }}
                <span class="text-body-2 text--secondary">
                  +{{ itemProps.item.dialCode }}
                </span>
              </slot>
            </v-list-item-title>
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
      :background-color="backgroundColor"
      :color="color"
      :dark="dark"
      :light="light"
      :rounded="rounded"
      :dense="dense"
      :height="height"
      :loader-height="loaderHeight"
      :reverse="reverse"
      :single-line="singleLine"
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
      v-bind="computedPhoneProps"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @click="$emit('click', $event)"
      @click:append="$emit('click:append', $event)"
      @click:append-outer="$emit('click:append-outer', $event)"
      @click:clear="$emit('click:clear', $event)"
      @click:prepend="$emit('click:prepend', $event)"
      @click:prepend-inner="$emit('click:prepend-inner', $event)"
      @keydown="$emit('keydown', $event)"
      @mousedown="$emit('mousedown', $event)"
      @mouseup="$emit('mouseup', $event)"
      @update:error="$emit('update:error', $event)"
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
import { VPhoneCountriesItems, VPhoneInputRules } from '@/types/components';
import { Country, CountryGuesser, CountryIso2 } from '@/types/countries';
import { CountryIconMode, Message, MessageOptions, MessageResolver } from '@/types/options';
import { PhoneNumberFormat, PhoneNumberObject } from '@/types/phone';
import normalizeCountryIso2 from '@/utils/countries/normalizeCountryIso2';
import { getOption } from '@/utils/options';
import PhoneUtils from '@/utils/phone';
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
    backgroundColor: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    light: {
      type: Boolean,
      default: undefined,
    },
    dark: {
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
    height: {
      type: [String, Number],
      default: undefined,
    },
    loaderHeight: {
      type: [String, Number],
      default: undefined,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    singleLine: {
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
    ignoredCountries: {
      type: Array as PropType<CountryIso2[]>,
      default: () => getOption('ignoredCountries'),
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
    country: {
      type: String,
      default: '',
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
      lazyCountry: this.country as CountryIso2 | undefined,
      lazyValue: this.value || '' as string | null,
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

      if (this.ignoredCountries.length) {
        const normalizedIgnoredCountries = this.ignoredCountries.map(normalizeCountryIso2);

        return this.allCountries.filter(
          ({ iso2 }) => normalizedIgnoredCountries.indexOf(iso2) === -1,
        );
      }

      return this.allCountries;
    },
    countriesItems(): VPhoneCountriesItems {
      const normalizedPreferredCountries = this.preferredCountries.map(normalizeCountryIso2);
      const filteredCountries = normalizedPreferredCountries.length
        ? this.filteredCountries.filter(
          ({ iso2 }) => normalizedPreferredCountries.indexOf(iso2) === -1,
        )
        : this.filteredCountries;

      const countriesItems = this.getCountries(this.preferredCountries)
        .map((country) => ({ ...country, preferred: true })) as VPhoneCountriesItems;
      if (filteredCountries.length) {
        if (countriesItems.length) {
          countriesItems.push({ divider: true });
        }

        countriesItems.push(...filteredCountries);
      }

      return countriesItems;
    },
    phoneExample(): string {
      return this.formatPhoneNumber(
        PhoneUtils.makeExample(this.activeCountry.iso2).toJSON(),
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
    computedCountryProps() {
      return {
        ...this.countryProps,
        menuProps: {
          contentClass: 'v-phone-input__country__menu',
          ...((this.countryProps ? this.countryProps.menuProps : undefined) || {}),
        },
      };
    },
    computedPhoneProps() {
      return { ...this.$attrs, ...this.phoneProps };
    },
  },
  watch: {
    computedInvalidMessage: 'onComputedInvalidMessageChange',
    rules: {
      handler: 'onRulesChange',
      immediate: true,
      deep: true,
    },
    displayFormat: 'onDisplayFormatChange',
    value: 'onValueChange',
    country: 'onCountryChange',
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
    onComputedInvalidMessageChange() {
      this.onRulesChange();
      this.validate();
    },
    onRulesChange() {
      const rules = this.rules.map((rule) => (
        typeof rule === 'function'
          ? (() => rule(this.lazyValue || '', this.lazyPhone, this.messageOptions))
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
    onCountryChange() {
      if (this.country && this.country !== this.lazyCountry) {
        this.lazyCountry = this.country;
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
        this.$emit('update:country', this.lazyCountry);
      } else {
        this.$nextTick(() => {
          if (!this.lazyCountry) {
            this.lazyCountry = oldLazyCountry;
          }
        });
      }

      this.onLazyCountryOrValueChange();

      this.validate();
    },
    onLazyValueChange() {
      const lazyCountry = (this.lazyValue || '').startsWith('+') ? undefined : this.lazyCountry;
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
    validate() {
      return (this.$refs.phoneInput as unknown as { validate: () => void }).validate();
    },
    makePhoneNumber(value?: string | null, iso2?: CountryIso2): PhoneNumberObject {
      return PhoneUtils.make(value, iso2).toJSON();
    },
    formatPhoneNumber(phone: PhoneNumberObject): string {
      return PhoneUtils.format(phone, this.displayFormat);
    },
    async initializeCountry(): Promise<void> {
      if (this.lazyCountry) {
        return;
      }

      if (this.filteredCountries.length === 1) {
        this.lazyCountry = this.filteredCountries[0].iso2;

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
    getCountries(countriesIso2 = [] as CountryIso2[]): Country[] {
      return countriesIso2
        .map((iso2) => this.findCountry(iso2))
        .filter((c): c is Country => !!c);
    },
    findCountry(iso2?: CountryIso2): Country | undefined {
      return this.allCountriesByIso2[normalizeCountryIso2(iso2)];
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
