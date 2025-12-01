<script
  setup
  lang="ts"
>
import { usePhoneInput } from 'v-phone-input';
import { toRef, useId } from 'vue';

const props = defineProps<{
  label?: string;
}>();

const country = defineModel<string>("country");
const modelValue = defineModel<string>();

const id = useId();

const {
  countryInputRef,
  phoneInputRef,
  countries,
  phoneValid,
  phone,
  countryLabel,
  label,
  example,
  invalidMessage,
} = usePhoneInput({
  label: toRef(props, "label"),
  country,
  modelValue,
});
</script>

<template>
  <div :class="$style.phoneInput">
    <label
      :for="`country-${id}`"
      :class="$style.label"
    >
      {{ countryLabel }}
    </label>
    <select
      ref="countryInputRef"
      v-model="country"
      :id="`country-${id}`"
      :class="$style.input"
    >
      <option
        v-for="country in countries"
        :key="`countries-${country.iso2}`"
        :value="country.iso2"
      >
        {{ country.name }}(+{{ country.dialCode }})
      </option>
    </select>
    <label
      :for="`phone-${id}`"
      :class="$style.label"
    >
      {{ label }}
    </label>
    <input
      ref="phoneInputRef"
      v-model="phone"
      :id="`phone-${id}`"
      :aria-describedby="`phone-${id}-message`"
      type="tel"
      :placeholder="example"
      :class="$style.input"
    >
    <p
      :id="`phone-${id}-message`"
      :class="$style.message"
    >
      {{ phoneValid ? '' : invalidMessage }}
    </p>
  </div>
</template>

<style module>
.phoneInput {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  margin-block-end: 4px;
}

.input {
  font-size: 1rem;
  padding: 6px 12px;
  margin-block-end: 16px;
  border-radius: 8px;
  border: 1px solid #eceff1;
  background: #eceff1;
}

.message {
  font-size: 0.875rem;
  margin-block: 0;
}
</style>
