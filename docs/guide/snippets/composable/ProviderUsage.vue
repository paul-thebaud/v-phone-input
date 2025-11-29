<script
  lang="ts"
  setup
>
import PhoneInputOptionsProvider from './PhoneInputOptionsProvider.vue';
import SignInForm from "./SignInForm.vue";
</script>

<template>
  <phone-input-options-provider>
    Render something deeper which uses phone input...
    <sign-in-form />
  </phone-input-options-provider>
</template>
