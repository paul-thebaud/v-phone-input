<script
  lang="ts"
  setup
>
import { ref } from 'vue';

const phone = ref('');
const password = ref('');

const onSubmit = async () => {
  // ...
};
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <!-- [!code highlight] -->
    <v-phone-input v-model="phone" />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
    />
  </v-form>
</template>
