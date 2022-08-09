<script lang="ts">
import { defineComponent } from 'vue';
import CodeBlock from './CodeBlock.vue';

export default defineComponent({
  components: { CodeBlock },
});
</script>

<template>
  <v-card
    id="install-card"
    data-cy="install-card"
  >
    <v-card-title>
      <h2 class="text-h5">
        Installation
      </h2>
    </v-card-title>
    <v-card-subtitle>
      You can install the package through Yarn or NPM.
    </v-card-subtitle>
    <v-card-text>
      <code-block
        name="Yarn add"
        code="yarn add v-phone-input"
        class="mb-5"
      />
      <code-block
        name="NPM install"
        code="npm install v-phone-input"
      />
    </v-card-text>
  </v-card>
</template>
