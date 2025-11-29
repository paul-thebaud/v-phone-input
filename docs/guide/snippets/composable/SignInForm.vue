<script
  lang="ts"
  setup
>
import { ref } from 'vue';
import Definition from './Definition.vue';

const phone = ref('');
const password = ref('');

const onSubmit = async () => {
  // ...
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <!-- [!code highlight:4] -->
      <definition
        v-model="phone"
        label="Phone"
      />
    </div>
    <div>
      <label for="password">
        Password
      </label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
      />
    </div>
  </form>
</template>
