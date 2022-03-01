<template>
  <v-card>
    <v-card-title>
      <h2 class="text-h5">
        Installation
      </h2>
    </v-card-title>
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

<script lang="ts">
import Vue from 'vue';
import CodeBlock from './CodeBlock.vue';

export default Vue.extend({
  name: 'InstallCard',
  components: { CodeBlock },
});
</script>
