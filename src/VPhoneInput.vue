<template>
  <div class="v-phone-input">
    <component
      ref="countryInput"
      :is="disabledSearchingCountry ? 'v-select' : 'v-autocomplete'"
      v-model="lazyCountry"
      :label="countryInputLabel"
      :aria-label="countryInputAriaLabel"
      :loading="loading || (!disabledLoadingCountry && !initiated)"
      :items="sortedCountries"
      class="v-phone-input__country"
      item-text="name"
      item-value="iso2"
      v-bind="$attrs"
    >
      <template #selection>
        <slot
          name="selection"
          :item="activeCountryOrFallback"
        >
          <div
            :class="activeCountryOrFallback.iso2.toLowerCase()"
            class="v-phone-input__selection__img vpi__flag"
          >
            <span
              class="d-sr-only"
              v-text="activeCountryOrFallback.name"
            />
          </div>
        </slot>
      </template>
      <template #item="{ item }">
        <slot
          name="item"
          :item="item"
        >
          <span
            :class="item.iso2.toLowerCase()"
            class="v-phone-input__selection__img vpi__flag"
          />
          <span v-text="`${item.name} +${item.dialCode}`" />
        </slot>
      </template>
    </component>
    <v-text-field
      ref="phoneInput"
      v-model="lazyValue"
      :label="label"
      :rules="phoneRules"
      :loading="loading"
      :placeholder="placeholder"
      :persistent-placeholder="persistentPlaceholder"
      :append-icon="appendIcon"
      :append-outer-icon="appendOuterIcon"
      :prepend-inner-icon="prependInnerIcon"
      :prepend-icon="prependIcon"
      :clear-icon="clearIcon"
      :hint="hint"
      :persistent-hint="persistentHint"
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
      v-bind="$attrs"
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
import PhoneNumber from 'awesome-phonenumber';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { VAutocomplete, VSelect, VTextField } from 'vuetify/lib';
import { Country, CountryIso2 } from '@/utils/countries';
import { getOption } from '@/utils/options';
import { DisplayMode, formatForMode, validateMode } from '@/utils/displayModes';
import { InputValidationRules } from 'vuetify';

type VPhoneInputRefs = Vue['$refs'] & {
  countryInput: InstanceType<typeof VSelect | typeof VAutocomplete>;
  phoneInput: InstanceType<typeof VTextField> & { validate: () => boolean };
}

type VPhoneInputRule =
  ((phoneString: string, countryString: string, objectValue: any) => string | boolean)
  | ((phoneString: string, countryString: string) => string | boolean)
  | ((phoneString: string) => string | boolean);
type VPhoneInputRules = (VPhoneInputRule | string)[];

@Component({
  name: 'VPhoneInput',
  inheritAttrs: false,
  components: { VAutocomplete, VSelect, VTextField },
})
export default class VPhoneInput extends Vue {
  @Prop({ type: Array, default: () => getOption('allCountries') })
  readonly allCountries!: Country[];

  @Prop({ type: Array, default: () => getOption('preferredCountries') })
  readonly preferredCountries!: CountryIso2[];

  @Prop({ type: Array, default: () => getOption('onlyCountries') })
  readonly onlyCountries!: CountryIso2[];

  @Prop({ type: Array, default: () => getOption('ignoredCountries') })
  readonly ignoredCountries!: CountryIso2[];

  @Prop({ type: String, default: getOption('defaultCountry') })
  readonly defaultCountry!: CountryIso2;

  @Prop({ type: Boolean, default: getOption('disabledLoadingCountry') })
  readonly disabledLoadingCountry!: boolean;

  @Prop({ type: Boolean, default: getOption('disabledFetchingCountry') })
  readonly disabledFetchingCountry!: boolean;

  @Prop({ type: Boolean, default: getOption('disabledSearchingCountry') })
  readonly disabledSearchingCountry!: boolean;

  @Prop({ type: Boolean, default: getOption('disabledValidation') })
  readonly disabledValidation!: boolean;

  @Prop({ type: String, default: getOption('countryLabel') })
  readonly countryLabel!: string;

  @Prop({ type: Boolean, default: getOption('hideCountryLabel') })
  readonly hideCountryLabel!: boolean;

  @Prop({ type: Function, default: getOption('computeCountryAriaLabel') })
  readonly computeCountryAriaLabel!: (label: string) => string;

  @Prop({ type: Function, default: getOption('computeInvalidMessage') })
  readonly computeInvalidMessage!: (label: string) => string;

  @Prop({ type: Function, default: getOption('guessCountry') })
  readonly guessCountry!: () => Promise<CountryIso2>;

  @Prop({ type: String, default: getOption('textMode'), validator: validateMode })
  readonly textMode!: DisplayMode;

  @Prop({ type: String, default: getOption('valueMode'), validator: validateMode })
  readonly valueMode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  @Prop({ type: String, default: getOption('label') })
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

  @Prop({ type: Array, default: () => [] })
  readonly rules!: VPhoneInputRules;

  @Prop({ type: String, default: '' })
  readonly value!: string;

  readonly $refs!: VPhoneInputRefs;

  initiated = false;

  lazyCountry = '' as CountryIso2 | undefined;

  lazyValue = '';

  get countryInputLabel(): string | undefined {
    return this.hideCountryLabel ? undefined : this.countryLabel;
  }

  get countryInputAriaLabel(): string | undefined {
    return this.computeCountryAriaLabel(this.label);
  }

  get allCountriesByIso2(): Record<CountryIso2, Country> {
    const allCountriesByIso2 = {} as Record<CountryIso2, Country>;

    this.allCountries.forEach((country) => {
      allCountriesByIso2[country.iso2] = country;
    });

    return allCountriesByIso2;
  }

  get fallbackCountry(): Country {
    return this.findCountry(this.defaultCountry)
      || this.findCountry(this.preferredCountries[0])
      || this.filteredCountries[0];
  }

  get activeCountry(): Country | undefined {
    return this.findCountry(this.lazyCountry);
  }

  get activeCountryOrFallback(): Country {
    return this.activeCountry || this.fallbackCountry;
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

  get phoneObject(): any {
    const phone = PhoneNumber(this.lazyValue || '', this.activeCountryOrFallback.iso2).toJSON();
    if (!this.lazyValue) {
      return {
        ...phone, number: { input: '' },
      };
    }

    return phone;
  }

  get phoneText(): string {
    return formatForMode(this.phoneObject, this.textMode);
  }

  get phoneValue(): string {
    return formatForMode(this.phoneObject, this.valueMode);
  }

  get phoneRules(): InputValidationRules {
    const rules = this.rules.map((rule) => (
      typeof rule === 'function'
        ? (() => rule(this.lazyValue, this.activeCountryOrFallback.iso2, this.phoneObject))
        : rule
    )) as InputValidationRules;
    if (this.disabledValidation) {
      return rules;
    }

    return [
      ...rules,
      () => !this.lazyValue || this.phoneObject.valid || this.computeInvalidMessage(this.label),
    ];
  }

  @Watch('value')
  onValueChange(value: string): void {
    this.lazyValue = value.trim();
  }

  @Watch('lazyValue')
  onLazyValueChange(newValue: string): void {
    if (newValue) {
      if (newValue[0] === '+') {
        const iso2 = this.getPhoneIso2(newValue);
        if (iso2) {
          this.lazyCountry = iso2;
        }
      }
    }

    this.$emit('input', this.phoneValue);
  }

  @Watch('phoneObject.valid')
  onPhoneObjectValidChange(valid: boolean): void {
    if (valid) {
      this.lazyValue = this.phoneText;
    }
  }

  @Watch('lazyCountry')
  onLazyCountryChange(): void {
    this.$nextTick(() => {
      this.lazyCountry = this.lazyCountry || this.fallbackCountry.iso2;
    });
  }

  @Watch('activeCountry')
  onActiveCountryChange(country: Country | undefined): void {
    if (country && !this.initiated) {
      this.initiated = true;
    }
  }

  @Watch('activeCountryOrFallback')
  onActiveCountryOrFallbackChange(): void {
    this.$refs.phoneInput.validate();
  }

  created(): void {
    if (this.value) {
      this.onValueChange(this.value);
    }
  }

  async mounted(): Promise<void> {
    try {
      await this.initializeCountry();
    } catch (error) {
      console.error(error);
    } finally {
      this.initiated = true;
    }
  }

  async initializeCountry(): Promise<void> {
    if (this.lazyValue && this.lazyValue[0] === '+') {
      const iso2 = this.getPhoneIso2(this.lazyValue);
      if (iso2) {
        this.lazyCountry = iso2;

        return;
      }
    }

    if (!this.disabledFetchingCountry) {
      try {
        if (this.lazyValue === '') {
          const guessedCountry = this.findCountry(await this.guessCountry())?.iso2;
          if (!this.lazyCountry && guessedCountry) {
            this.lazyCountry = guessedCountry;
          }
        }

        return;
      } catch (error) {
        console.warn(error);
      }
    }

    this.lazyCountry = this.lazyCountry || this.fallbackCountry.iso2;
  }

  getPhoneIso2(phone: string): CountryIso2 | undefined {
    const iso2 = PhoneNumber(phone).getRegionCode();

    return iso2 ? this.findCountry(iso2)?.iso2 : undefined;
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
}
</script>

<style
  lang="scss"
  src="./scss/v-phone-input-flags.scss"
/>
<style
  lang="scss"
  src="./scss/v-phone-input.scss"
/>
