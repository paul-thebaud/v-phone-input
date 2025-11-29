<script
  setup
  lang="ts"
>
import { useAttrs } from "vue";
import {
  usePhoneInput,
  type VPhoneInputComposableOptions,
  type VPhoneInputCountryObject,
} from '../../src';

const modelValue = defineModel<string>();
const country = defineModel<string>("country");

const attrs = useAttrs();

const {
  countryInputRef,
  phoneInputRef,
  countries,
  phone,
  countryAriaLabel,
  label,
  phoneValid,
  invalidMessage,
} = usePhoneInput({
  ...attrs,
  country,
  modelValue,
});
</script>

<template>
  <select
    ref="countryInputRef"
    id="country"
    v-model="country"
    :aria-label="countryAriaLabel"
  >
    <option
      v-for="country in countries"
      :key="`countries-${country.iso2}`"
      :value="country.iso2"
    >
      {{ country.name }}
    </option>
  </select>
  <label for="phone">{{ label }}</label>
  <input
    ref="phoneInputRef"
    v-model="phone"
    id="phone"
    name="phone"
    type="tel"
    aria-describedby="error"
  >
  <p id="error">
    {{ phoneValid === false ? invalidMessage : '' }}
  </p>
</template>
