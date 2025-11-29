<script
  lang="ts"
  setup
>
import { usePhoneInput } from 'v-phone-input';
import { toRef } from 'vue';

const props = defineProps<{
  label?: string;
}>();

const country = defineModel<string>("country");
const modelValue = defineModel<string>();

const {
  countryInputRef,
  phoneInputRef,
  countries,
  phone,
} = usePhoneInput({
  label: toRef(props, 'label'),
  country,
  modelValue,
});
</script>

<template>
  <select
    ref="countryInputRef"
    v-model="country"
    aria-label="Country"
  >
    <option
      v-for="country in countries"
      :key="`countries-${country.iso2}`"
      :value="country.iso2"
    >
      {{ country.name }}
    </option>
  </select>
  <label for="phone">
    Phone
  </label>
  <input
    ref="phoneInputRef"
    v-model="phone"
    id="phone"
    name="phone"
    type="tel"
  />
</template>
