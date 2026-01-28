<script
  lang="ts"
  setup
>
// [!code ++]
import { getExample, parsePhoneNumber } from "awesome-phonenumber";
import { computed, ref } from "vue";

const phone = ref('');

// [!code ++:3]
const country = ref('FR');
const label = computed(() => "Phone");
const example = computed(() => getExample(country.value).number?.national ?? '');

const rules = computed(() => [
  // [!code --:3]
  (value, phone, { country, label, example }) => {
    console.log(phone, country, label, example);
  },
  // [!code ++:4]
  (value) => {
    const phoneObject = parsePhoneNumber(value ?? '', { regionCode: country.value });
    // equivalent in v6:
    console.log(phone, country, label, example);
  },
]);
</script>

<template>
  <v-phone-input
    v-model="phone"
    v-model:country="country"
    :label="label"
    :rules="rules"
  />
</template>
