<script
  setup
  lang="ts"
>
import { selectPhoneCountryInput, VPhoneInput } from "../../src";
</script>

<template>
  <v-phone-input v-bind="selectPhoneCountryInput">
    <template #country-input:prepend-inner>
      P
    </template>
    <template #country-display="{ country, decorative }">
      {{ country.iso2 }}
    </template>
    <template #label>My phone</template>
  </v-phone-input>
</template>
