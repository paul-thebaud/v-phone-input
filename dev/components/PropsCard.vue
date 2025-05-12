<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef, watch } from 'vue';
import { useTheme } from 'vuetify';
import { VSelect, VSwitch, VTextField } from 'vuetify/components';
import { titleCase } from '../utils';
import filterObject from '../utils/filterObject';

export default defineComponent({
  components: {
    VSelect,
    VSwitch,
    VTextField,
  },
  props: {
    modelValue: {
      required: true,
      type: Object as PropType<Record<string, unknown>>,
    },
  },
  emits: {
    'update:modelValue': (_value: Record<string, unknown>) => true,
  },
  setup(props, { emit }) {
    const theme = useTheme();
    const themeValue = toRef(theme.global, 'name');

    const createInput = (
      component: string,
      inputProps: Record<string, unknown> = {},
      colProps: Record<string, unknown> = {},
    ) => ({ type: component, inputProps, colProps });
    const createSwitch = (colProps?: Record<string, unknown>) => createInput('v-switch', {}, colProps);
    const createTextField = (colProps?: Record<string, unknown>) => createInput('v-text-field', {}, colProps);
    const createSelect = (
      items: Record<string, unknown>[],
      colProps?: Record<string, unknown>,
    ) => createInput('v-select', { items }, colProps);
    const toItems = (values: (string | null)[]) => values.map((value) => ({
      value, title: value ? titleCase(value) : 'Default',
    }));

    const search = ref('');
    const lazyValue = ref(props.modelValue);
    const inputs = ref({
      enableSearchingCountry: createSwitch({ sm: 12 }),
      countryIconMode: createSelect([
        { value: 'text', title: 'Text (default)' },
        { value: 'svg', title: 'SVG (using flag-icons)' },
        { value: 'sprite', title: 'CSS sprite (using world-flags-sprite)' },
      ]),
      displayFormat: createSelect([
        { value: 'national', title: 'National (default)' },
        { value: 'e164', title: 'E164' },
        { value: 'international', title: 'International' },
        { value: 'significant', title: 'Significant' },
      ]),
      variant: createSelect(toItems(['filled', 'solo', 'outlined', 'plain', 'underlined'])),
      density: createSelect(toItems(['default', 'comfortable', 'compact'])),
      singleLine: createSwitch(),
      hideDetails: createSwitch(),
      label: createTextField(),
      ariaLabel: createTextField(),
      countryLabel: createTextField(),
      countryAriaLabel: createTextField(),
      placeholder: createTextField(),
      persistentPlaceholder: createSwitch(),
      hint: createTextField(),
      persistentHint: createSwitch(),
      invalidMessage: createTextField(),
      error: createSwitch(),
      clearable: createSwitch(),
      readonly: createSwitch(),
      disabled: createSwitch(),
      loading: createSwitch(),
      shaped: createSwitch(),
      rounded: createSelect(toItems(['default', 'sm', 'md', 'lg', 'xl', 'pill'])),
      showDialCode: createSwitch()
    });
    const themeItems = [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }];

    const filteredInputs = computed(() => (
      search.value
        ? filterObject(inputs.value, (_, prop) => prop.indexOf(search.value) !== -1)
        : inputs.value
    ));

    const onValueChange = (value: Record<string, unknown>) => {
      lazyValue.value = value;
    };

    const onLazyValueChange = (value: Record<string, unknown>) => {
      emit('update:modelValue', value);
    };

    watch(props.modelValue, onValueChange);
    watch(lazyValue, onLazyValueChange);

    return {
      titleCase,
      themeValue,
      themeItems,
      search,
      lazyValue,
      filteredInputs,
    };
  },
});
</script>

<template>
  <v-card
    id="props-card"
    data-cy="props-card"
  >
    <v-card-title>
      <h2 class="text-h5">
        Configuration
      </h2>
    </v-card-title>
    <v-card-subtitle>
      You can customize the input options here.
    </v-card-subtitle>
    <v-card-text>
      <v-select
        v-model="themeValue"
        :prepend-inner-icon="themeValue === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        label="Theme"
        :items="themeItems"
        hide-details
      />
    </v-card-text>
    <v-divider role="presentation" />
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            data-cy="search-props"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row role="list">
        <v-col
          v-for="(input, prop) in filteredInputs"
          :key="`inputs-${prop}`"
          role="listitem"
          cols="12"
          sm="6"
          v-bind="input.colProps"
        >
          <component
            :is="input.type"
            v-model="lazyValue[prop]"
            :data-cy="`prop-input-${prop}`"
            :label="titleCase(prop)"
            hide-details
            v-bind="input.inputProps"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
