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
      auto-select-first
      v-bind="{ ...$attrs, ...countryInputProps }"
    >
      <template #selection>
        <slot
          name="selection"
          :item="activeCountry"
        >
          <div
            :class="activeCountry.iso2.toLowerCase()"
            class="v-phone-input__selection__img vpi__flag"
          >
            <span
              class="d-sr-only"
              v-text="activeCountry.name"
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
      class="v-phone-input__phone"
      type="tel"
      v-bind="{ ...$attrs, ...phoneInputProps }"
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
import { InputValidationRule, InputValidationRules } from 'vuetify';
import { VAutocomplete, VSelect, VTextField } from 'vuetify/lib';
import { Country, CountryIso2, guessCountry } from '@/utils/countries';
import { getOption } from '@/utils/options';
import { DisplayMode, formatForMode, validateMode } from '@/utils/displayModes';

type VPhoneInputRefs = Vue['$refs'] & {
  phoneInput: { validate: () => boolean };
}

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

  @Prop({ type: String, default: getOption('textMode'), validator: validateMode })
  readonly textMode!: DisplayMode;

  @Prop({ type: String, default: getOption('valueMode'), validator: validateMode })
  readonly valueMode!: DisplayMode;

  @Prop({ type: String, default: getOption('label') })
  readonly label!: string;

  @Prop({ type: String, default: getOption('invalidMessage') })
  readonly invalidMessage!: string;

  @Prop({ type: Object, default: () => ({}) })
  readonly countryInputProps!: object;

  @Prop({ type: Object, default: () => ({}) })
  readonly phoneInputProps!: object;

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  @Prop({ type: String, default: '' })
  readonly value!: string;

  @Prop({ type: Array, default: () => [] })
  readonly rules!: InputValidationRules;

  readonly $refs!: VPhoneInputRefs;

  initiated = false;

  lazyCountry = '';

  lazyValue = '';

  get countryInputLabel() {
    return this.hideCountryLabel ? undefined : this.countryLabel;
  }

  get countryInputAriaLabel() {
    return this.hideCountryLabel ? this.countryLabel : undefined;
  }

  get allCountriesByIso2() {
    const allCountriesByIso2 = {} as Record<string, Country>;

    this.allCountries.forEach((country) => {
      allCountriesByIso2[country.iso2] = country;
    });

    return allCountriesByIso2;
  }

  get activeCountry() {
    return this.findCountry(this.lazyCountry);
  }

  get filteredCountries() {
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

  get sortedCountries() {
    const preferredCountries = this.getCountries(this.preferredCountries)
      .map((country) => ({ ...country, preferred: true }));

    return [...preferredCountries, ...this.filteredCountries];
  }

  get phoneObject() {
    const phone = PhoneNumber(this.lazyValue || '', this.lazyCountry).toJSON();
    if (!this.lazyValue) {
      return {
        ...phone, number: { input: '' },
      };
    }

    return phone;
  }

  get phoneText() {
    return formatForMode(this.phoneObject, this.textMode);
  }

  get phoneValue() {
    return formatForMode(this.phoneObject, this.valueMode);
  }

  get phoneRules() {
    const rules = this.rules.map((rule: InputValidationRule | string) => (
      typeof rule === 'function'
        ? () => rule(this.phoneObject)
        : rule
    ));
    if (this.disabledValidation) {
      return rules;
    }

    return [
      ...rules,
      () => !this.lazyValue || this.phoneObject.valid || this.invalidMessage,
    ];
  }

  @Watch('value')
  onValueChange(value: string) {
    this.lazyValue = value.trim();
  }

  @Watch('lazyValue')
  onLazyValueChange(newValue: string) {
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
  onPhoneObjectValidChange(valid: boolean) {
    if (valid) {
      this.lazyValue = this.phoneText;
    }
  }

  @Watch('activeCountry')
  onActiveCountryChange(country: Country) {
    if (country && !this.initiated) {
      this.initiated = true;
    }

    this.$refs.phoneInput.validate();
    this.$emit('update:country', country);
  }

  created() {
    if (this.value) {
      this.onValueChange(this.value);
    }
  }

  async mounted() {
    try {
      await this.initializeCountry();
    } catch (error) {
      console.error(error);
    } finally {
      this.initiated = true;
    }
  }

  async initializeCountry() {
    if (this.lazyValue && this.lazyValue[0] === '+') {
      const iso2 = this.getPhoneIso2(this.lazyValue);
      if (iso2) {
        this.lazyCountry = iso2;

        return;
      }
    }

    const fallbackCountry = this.findCountry(this.defaultCountry)?.iso2
      || this.findCountry(this.preferredCountries[0])?.iso2
      || this.filteredCountries[0]?.iso2;
    if (!this.disabledFetchingCountry) {
      try {
        if (this.lazyValue === '') {
          const guessedCountry = this.findCountry(await guessCountry())?.iso2;
          if (!this.lazyCountry && guessedCountry) {
            this.lazyCountry = guessedCountry;
          }
        }

        return;
      } catch (error) {
        console.warn(error);
      }
    }

    this.lazyCountry = this.lazyCountry || fallbackCountry;
  }

  getPhoneIso2(phone: string): string | undefined {
    const iso2 = PhoneNumber(phone).getRegionCode();

    return iso2 ? this.findCountry(iso2)?.iso2 : undefined;
  }

  /**
   * Get a list of countries matching given ISO2 codes.
   *
   * @param {string[]} countriesIso2
   *
   * @returns {Country[]}
   */
  getCountries(countriesIso2 = [] as string[]) {
    return countriesIso2
      .map((iso2) => this.findCountry(iso2))
      .filter((c): c is Country => !!c);
  }

  /**
   * Find a country using its ISO2 code.
   *
   * @param {string} iso2
   *
   * @returns {Country | undefined}
   */
  findCountry(iso2 = '' as string) {
    return this.allCountriesByIso2[iso2.toUpperCase()];
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
