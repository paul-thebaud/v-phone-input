<template>
  <div class="v-phone-input">
    <component
      ref="countryInput"
      :is="enableSearchingCountry ? 'v-autocomplete' : 'v-select'"
      v-model="lazyCountry"
      :label="countryInputLabel"
      :aria-label="countryInputAriaLabel"
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
    >
      <template #selection>
        <slot
          name="selection"
          :item="activeCountry"
        >
          <template v-if="countryIconComponent">
            <component
              :is="countryIconComponent"
              :country="activeCountry"
              :decorative="false"
              class="ml-2"
            />
          </template>
          <span
            v-else
            v-text="activeCountry.iso2.toUpperCase()"
          />
        </slot>
      </template>
      <template #item="{ item }">
        <slot
          name="item"
          :item="item"
        >
          <v-list-item-icon v-if="countryIconComponent">
            <component
              :is="countryIconComponent"
              :country="item"
              :decorative="true"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="`${item.name} +${item.dialCode}`" />
          </v-list-item-content>
        </slot>
      </template>
    </component>
    <v-text-field
      ref="phoneInput"
      v-model="lazyValue"
      :label="label"
      :hint="hint"
      :persistent-hint="persistentHint"
      :rules="mergedRules"
      :placeholder="placeholder"
      :persistent-placeholder="persistentPlaceholder"
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
    >
      <template #append>
        <slot name="append" />
      </template>
      <template #append-outer>
        <slot name="append-outer" />
      </template>
      <template #counter="props">
        <slot
          name="counter"
          v-bind="props"
        />
      </template>
      <template #label>
        <slot name="label" />
      </template>
      <template #message="props">
        <slot
          name="message"
          v-bind="props"
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
import { VPhoneInputRefs, VPhoneInputRules } from '@/components/types';
import { Country, CountryGuesser, CountryIso2 } from '@/utils/countries/types';
import { getOption } from '@/utils/options';
import { PhoneNumberFormat } from '@/utils/options/types';
import PhoneNumber from 'awesome-phonenumber';
import Vue, { VueConstructor } from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';
import { VSelect, VTextField } from 'vuetify/lib';

@Component({
  name: 'VPhoneInput',
  inheritAttrs: false,
  components: { VSelect, VTextField },
})
export default class VPhoneInput extends Vue {
  readonly $refs!: VPhoneInputRefs;

  @Prop({ type: String, default: () => getOption('label') })
  readonly label!: string;

  @Prop({ type: String })
  readonly placeholder!: string | undefined;

  @Prop({ type: Boolean })
  readonly persistentPlaceholder!: boolean | undefined;

  @Prop({ type: String })
  readonly appendIcon!: string | undefined;

  @Prop({ type: String })
  readonly appendOuterIcon!: string | undefined;

  @Prop({ type: String })
  readonly prependInnerIcon!: string | undefined;

  @Prop({ type: String })
  readonly prependIcon!: string | undefined;

  @Prop({ type: String })
  readonly clearIcon!: string | undefined;

  @Prop({ type: Boolean })
  readonly outlined!: boolean;

  @Prop({ type: Boolean })
  readonly filled!: boolean;

  @Prop({ type: Boolean })
  readonly shaped!: boolean;

  @Prop({ type: Boolean })
  readonly flat!: boolean;

  @Prop({ type: Boolean })
  readonly solo!: boolean;

  @Prop({ type: Boolean })
  readonly soloInverted!: boolean;

  @Prop({ type: Boolean })
  readonly rounded!: boolean;

  @Prop({ type: Boolean })
  readonly dense!: boolean;

  @Prop({ type: String })
  readonly hint!: string | undefined;

  @Prop({ type: Boolean })
  readonly persistentHint!: boolean | undefined;

  @Prop({ type: Boolean })
  readonly clearable!: boolean | undefined;

  @Prop({ type: Boolean })
  readonly autofocus!: boolean | undefined;

  @Prop({ type: Boolean })
  readonly error!: boolean | undefined;

  @Prop({ type: [Number, String] })
  readonly errorCount!: number | string | undefined;

  @Prop({ type: [Array, String] })
  readonly errorMessages!: string[] | string | undefined;

  @Prop({ type: [Array, String] })
  readonly messages!: string[] | string | undefined;

  @Prop({ type: Boolean })
  readonly success!: boolean | undefined;

  @Prop({ type: [Array, String] })
  readonly successMessages!: string[] | string | undefined;

  @Prop({ type: Boolean })
  readonly validateOnBlur!: boolean | undefined;

  @Prop({ type: Boolean })
  readonly readonly!: boolean;

  @Prop({ type: Boolean })
  readonly disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  @Prop({ type: Array, default: () => [] })
  readonly rules!: VPhoneInputRules;

  @Prop({ type: [String, Function, Object], default: () => getOption('countryIconComponent') })
  readonly countryIconComponent!: VueConstructor;

  @Prop({ type: String, default: () => getOption('countryLabel') })
  readonly countryLabel!: string;

  @Prop({ type: String })
  readonly countryAriaLabel!: string | undefined;

  @Prop({ type: Boolean, default: () => getOption('hideCountryLabel') })
  readonly hideCountryLabel!: boolean;

  @Prop({ type: Array, default: () => getOption('allCountries') })
  readonly allCountries!: Country[];

  @Prop({ type: Array, default: () => getOption('preferredCountries') })
  readonly preferredCountries!: CountryIso2[];

  @Prop({ type: Array, default: () => getOption('onlyCountries') })
  readonly onlyCountries!: CountryIso2[];

  @Prop({ type: Array, default: () => getOption('ignoredCountries') })
  readonly ignoredCountries!: CountryIso2[];

  @Prop({ type: String, default: () => getOption('defaultCountry') })
  readonly defaultCountry!: CountryIso2;

  @Prop({ type: Object, default: () => getOption('countryGuesser') })
  readonly countryGuesser!: CountryGuesser;

  @Prop({ type: Boolean, default: () => getOption('disableGuessLoading') })
  readonly disableGuessLoading!: boolean;

  @Prop({ type: Boolean, default: () => getOption('disableGuessingCountry') })
  readonly disableGuessingCountry!: boolean;

  @Prop({ type: Boolean, default: () => getOption('enableSearchingCountry') })
  readonly enableSearchingCountry!: boolean;

  @Prop({ type: Boolean, default: () => getOption('disableValidation') })
  readonly disableValidation!: boolean;

  @Prop({ type: String })
  readonly invalidMessage!: string | undefined;

  @Prop({ type: String, default: () => getOption('displayFormat') })
  readonly displayFormat!: PhoneNumberFormat;

  @Prop({ type: String, default: '' })
  readonly value!: string;

  guessingCountry = false;

  mergedRules = [] as InputValidationRules;

  lazyCountry: string | undefined;

  lazyValue: string;

  lazyPhone: PhoneNumber;

  constructor() {
    super();

    this.lazyCountry = '';
    this.lazyValue = this.value || '';
    this.lazyPhone = this.makePhoneNumber();
  }

  get countryInputLabel(): string | undefined {
    return this.hideCountryLabel ? undefined : this.countryLabel;
  }

  get countryInputAriaLabel(): string | undefined {
    return this.countryAriaLabel || getOption('computeCountryAriaLabel')({ label: this.label });
  }

  get fallbackCountry(): Country {
    return this.findCountry(this.defaultCountry)
      || this.findCountry(this.preferredCountries[0])
      || this.filteredCountries[0];
  }

  get activeCountry(): Country {
    return this.findCountry(this.lazyCountry)
      || this.fallbackCountry;
  }

  get allCountriesByIso2(): Record<CountryIso2, Country> {
    const allCountriesByIso2 = {} as Record<CountryIso2, Country>;

    this.allCountries.forEach((country) => {
      allCountriesByIso2[country.iso2] = country;
    });

    return allCountriesByIso2;
  }

  get filteredCountries(): Country[] {
    if (this.onlyCountries.length) {
      return this.getCountries(this.onlyCountries);
    }

    if (this.ignoredCountries.length) {
      return this.allCountries.filter(
        ({ iso2 }) => this.ignoredCountries.indexOf(iso2.toUpperCase()) === -1
          && this.ignoredCountries.indexOf(iso2.toLowerCase()) === -1,
      );
    }

    return this.allCountries;
  }

  get sortedCountries(): Country[] {
    const preferredCountries = this.getCountries(this.preferredCountries)
      .map((country) => ({ ...country, preferred: true }));

    return [...preferredCountries, ...this.filteredCountries];
  }

  @Watch('disableValidation')
  @Watch('rules', { immediate: true, deep: true })
  onRulesChange() {
    const rules = this.rules.map((rule) => (
      typeof rule === 'function'
        ? (() => rule(this.lazyValue, this.activeCountry.iso2, this.lazyPhone))
        : rule
    )) as InputValidationRules;
    if (this.disableValidation) {
      this.mergedRules = rules;
    } else {
      this.mergedRules = [
        ...rules,
        () => !this.lazyValue || this.lazyPhone.isValid() || this.computeInvalidMessage(),
      ];
    }
  }

  @Watch('value')
  onValueChange() {
    const number = this.lazyPhone.toJSON().number;
    if (this.value !== number.input && this.value !== number.e164) {
      this.lazyValue = this.value || '';
    }
  }

  @Watch('lazyCountry')
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
  }

  @Watch('lazyValue')
  onLazyValueChange() {
    const lazyCountry = this.lazyValue.startsWith('+') ? undefined : this.lazyCountry;
    const lazyPhone = this.makePhoneNumber(this.lazyValue, lazyCountry);
    const iso2 = lazyPhone.getRegionCode();
    if (iso2 && this.lazyCountry !== iso2) {
      this.lazyCountry = iso2;
    }
  }

  @Watch('lazyCountry')
  @Watch('lazyValue')
  onLazyCountryOrValueChange() {
    this.lazyPhone = this.makePhoneNumber(this.lazyValue, this.lazyCountry);

    if (this.lazyPhone.isValid()) {
      this.lazyValue = this.formatPhoneNumber(this.lazyPhone);
    }
  }

  @Watch('lazyPhone', { deep: true })
  onLazyPhoneChange() {
    const number = this.lazyPhone.toJSON().number;
    const newValue = number.e164 || number.input;
    if (newValue !== this.value) {
      this.$emit('input', newValue);
    }
  }

  mounted(): void {
    this.onLazyValueChange();

    this.$nextTick(() => {
      this.initializeCountry();
    });
  }

  makePhoneNumber(value?: string, iso2?: CountryIso2): PhoneNumber {
    return PhoneNumber((value || '').trim(), iso2);
  }

  formatPhoneNumber(phone: PhoneNumber): string {
    return phone.getNumber(this.displayFormat);
  }

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
  }

  getCountryText(country: Country): string {
    return `${country.name} ${country.iso2} ${country.dialCode}`;
  }

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
  }

  /**
   * Find a country using its ISO2 code.
   *
   * @param {CountryIso2 | undefined} iso2
   *
   * @returns {Country | undefined}
   */
  findCountry(iso2 = undefined as CountryIso2 | undefined): Country | undefined {
    return this.allCountriesByIso2[(iso2 || '').toUpperCase()];
  }

  computeInvalidMessage(): string {
    return this.invalidMessage || getOption('computeInvalidMessage')({
      label: this.label,
      example: this.formatPhoneNumber(PhoneNumber.getExample(this.activeCountry.iso2)),
    });
  }
}
</script>

<style
  lang="scss"
  src="../scss/v-phone-input.scss"
/>
