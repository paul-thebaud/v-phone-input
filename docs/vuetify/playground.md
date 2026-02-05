---
aside: false
---

# Playground

<script setup>
import { computed, ref } from 'vue';
import Playground from '../components/vuetify/Playground.vue';

const config = ref();

const configPackages = computed(() => {
  const packages = ['v-phone-input'];

  if (config.value?.countryDisplayMode === 'svg') {
    packages.push('flag-icons');
  } else if (config.value?.countryDisplayMode === 'sprite') {
    packages.push('world-flags-sprite');
  }

  return packages.join(' ');
});

const configCodes = computed(() => {
  if (!config.value) {
    return '';
  }

  const packageImports = ['createVPhoneInput'];
  const configProps = [];

  if (config.value.countryInputMode === 'select') {
    packageImports.push('selectPhoneCountryInput');
    configProps.push('...selectPhoneCountryInput');
  } else {
    packageImports.push('autocompletePhoneCountryInput');
    configProps.push('...autocompletePhoneCountryInput');
  }

  if (config.value.countryDisplayMode === 'svg') {
    packageImports.push('VPhoneCountryFlagSvg');
    configProps.push('countryDisplayComponent: VPhoneCountryFlagSvg');
  } else if (config.value.countryDisplayMode === 'sprite') {
    packageImports.push('VPhoneCountryFlagSprite');
    configProps.push('countryDisplayComponent: VPhoneCountryFlagSprite');
  }

  if (config.value.displayFormat) {
    configProps.push(`displayFormat: '${config.value.displayFormat}'`);
  }

  if (config.value.modelFormat) {
    configProps.push(`modelFormat: '${config.value.modelFormat}'`);
  }

  return {
    packageImports: packageImports.join(', '),
    configProps: `{
  ${configProps.join(',\n  ')},
}`,
  };
});

const onConfigUpdate = (nextConfig) => {
  config.value = nextConfig;
};
</script>

<Playground @update:config="onConfigUpdate" />

::: code-group

```sh-vue [npm]
$ npm add {{ configPackages }}
```

```sh-vue [pnpm]
$ pnpm add v-phone-input flag-icons
```

```sh-vue [yarn]
$ yarn add v-phone-input flag-icons
```

```sh-vue [bun]
$ bun add v-phone-input {{ 2 }}flag-icons
```

:::

<template v-if="config?.countryDisplayMode">

```ts-vue [plugin.ts]
import '{{ config.countryDisplayMode === 'svg' ? 'flag-icons/css/flag-icons.min.css' : 'world-flags-sprite/stylesheets/flags32.css' }}';
import 'v-phone-input/styles';
import { {{ configCodes?.packageImports }} } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({{ configCodes?.configProps }})
```

</template>
<template v-else-if="config">

```ts-vue [plugin.ts]
import 'v-phone-input/styles';
import { {{ configCodes?.packageImports }} } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({{ configCodes?.configProps }})
```

</template>
