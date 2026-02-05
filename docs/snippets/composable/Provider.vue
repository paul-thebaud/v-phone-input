<script
  lang="ts"
  setup
>
import { providePhoneInputOptions } from "v-phone-input";

providePhoneInputOptions({
  displayFormat: "e164",
});
</script>

<template>
  <slot />
</template>
