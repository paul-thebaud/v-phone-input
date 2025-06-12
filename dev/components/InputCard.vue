<script lang="ts">
import { countries } from '@/index';
import { computed, defineComponent, PropType, ref, toRef } from 'vue';
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
    const inputRef = ref(null as any | null);
    const inputCountry = ref('');
    const inputValue = ref('');

    const options = useOptions(toRef(props, 'inputProps'));

    const value = computed(() => inputValue.value || '-');
    const valid = computed(() => inputRef.value?.isValid ?? false);
    const country = computed(() => (
      countries.find((c) => c.iso2 === inputCountry.value)?.name || 'Unknown'
    ));

    const createPluginCode = computed(() => {
      const imports = [
        'import \'v-phone-input/dist/v-phone-input.css\';',
        'import { createVPhoneInput } from \'v-phone-input\';',
      ];
      const uses = ['app.use(vPhoneInput);'];

      if (options.value.countryIconMode === 'svg') {
        imports.splice(0, 0, 'import \'flag-icons/css/flag-icons.min.css\';');
      }

      if (options.value.countryIconMode === 'sprite') {
        imports.splice(0, 0, 'import \'world-flags-sprite/stylesheets/flags32.css\';');
      }

      if (options.value.enableSearchingCountry) {
        imports.push('import { VAutocomplete } from \'vuetify/components\';');
        uses.unshift('app.component(\'VAutocomplete\', VAutocomplete);');
      }

      const optionsString = JSON.stringify(options.value, null, 2)
        .replace(/"([a-zA-Z]+)":/g, '$1:')
        .replace(/"/g, '\'');
      const instantiation = `const vPhoneInput = createVPhoneInput(${optionsString});`;

      return [imports.join('\n'), instantiation, uses.join('\n')].join('\n\n');
    });

    return {
      inputRef,
      inputValue,
      inputCountry,
      value,
      valid,
      country,
      createPluginCode,
    };
  },
});
</script>

<template>
  <v-card
    id="input-card"
    data-cy="input-card"
  >
    <v-card-title>
      <h2 class="text-h5">
        Input preview
      </h2>
    </v-card-title>
    <v-card-subtitle>
      You can try the input and copy plugin options here.
    </v-card-subtitle>
    <v-card-text data-cy="input-wrapper">
      <v-phone-input
        ref="inputRef"
        v-model="inputValue"
        v-model:country="inputCountry"
        v-bind="inputProps"
      />
    </v-card-text>
    <v-divider role="presentation" />
    <v-list
      data-cy="input-card-props"
      density="compact"
    >
      <v-list-item
        prepend-icon="mdi-phone"
        title="Value"
        :subtitle="value"
      />
      <v-list-item
        prepend-icon="mdi-check-circle-outline"
        title="Valid"
      >
        <v-chip
          :prepend-icon="valid ? '$success' : '$error'"
          :color="valid ? 'success' : 'error'"
          class="font-weight-bold"
        >
          {{ valid ? 'true' : 'false' }}
        </v-chip>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-earth"
        title="Country"
        :subtitle="country"
      />
      <v-list-item
        prepend-icon="mdi-code-json"
        title="Your plugin creation"
        subtitle="Use this when creating the plugin"
      />
      <code-block
        name="Plugin initialization code"
        :code="createPluginCode"
        class="mx-4 my-2"
      />
    </v-list>
  </v-card>
</template>
