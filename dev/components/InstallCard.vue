<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue';
import useOptions from '../composables/useOptions';
import CodeBlock from './CodeBlock.vue';

export default defineComponent({
  components: { CodeBlock },
  props: {
    inputProps: {
      required: true,
      type: Object as PropType<Record<string, unknown>>,
    },
  },
  setup(props) {
    const options = useOptions(toRef(props, 'inputProps'));

    const packagesToInstall = computed(() => {
      const packages = ['v-phone-input'];

      if (options.value.countryIconMode === 'svg') {
        packages.push('flag-icons');
      }

      if (options.value.countryIconMode === 'sprite') {
        packages.push('world-flags-sprite');
      }

      return packages.join(' ');
    });

    return { packagesToInstall };
  },
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
        :code="`npm install ${packagesToInstall}`"
        name="NPM install"
        class="mb-5"
      />
      <code-block
        :code="`yarn add ${packagesToInstall}`"
        name="Yarn add"
        class="mb-5"
      />
      <code-block
        :code="`pnpm add ${packagesToInstall}`"
        name="PNPM add"
      />
    </v-card-text>
  </v-card>
</template>
