# Vuetify component

[`VPhoneInput`](/api/variables/VPhoneInput) is a Vue component built
for Vuetify. It provides all features presented inside this documentation.
When a feature is available with `VPhoneInput` component, it will have
a <component-feature-tag /> tag inside this documentation.

## Installation

::: code-group

```sh [npm]
$ npm add v-phone-input flag-icons
```

```sh [pnpm]
$ pnpm add v-phone-input flag-icons
```

```sh [yarn]
$ yarn add v-phone-input flag-icons
```

```sh [bun]
$ bun add v-phone-input flag-icons
```

:::

::: tip
You can generate your VPhoneInput dependencies install command and
plugin creation code [on the playground](/playground).
:::

::: tip
In this guide, we suggest you to install `flag-icons` and use
[`VPhoneCountryFlagSvg`](/api/functions/VPhoneCountryFlagSvg)
for the phone input
[`countryDisplayComponent`](/api/interfaces/VPhoneInputProps#countryDisplayComponent-1).
You can easily customize this behavior by following the
[country display guide](/guide/country-display).
:::

::: warning

VPhoneInput component requires [Vuetify](https://vuetifyjs.com/).
If you are not using Vuetify, you can still use [`usePhoneInput`](/guide/composable)
to implement your own phone number input.

:::

## Usage

When using the Vue component, the easiest way to using the input is to define a
plugin using [`createVPhoneInput`](/api/functions/createVPhoneInput)
before using it inside your components. This way, you can define common
behaviors for every phone input inside your project. In the following example
`app.ts`, we use [`selectPhoneCountryInput`](/api/variables/selectPhoneCountryInput)
to define the country input to be a `VSelect`, and
[`countryDisplayComponent`](/api/interfaces/VPhoneInputProps#countryDisplayComponent-1)
with [`VPhoneCountryFlagSvg`](/api/functions/VPhoneCountryFlagSvg) to
use SVG flags to display countries. This may be changed to an
[autocomplete input](/guide/country-autocomplete) with
[other country display](/guide/country-display).

After that, the `VPhoneInput` component
will be registered inside your Vue application, and you will be able to use
it every, like in the sign-in form of the following example.

::: code-group

```ts [app.ts]
// [!code ++:3]
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/styles';
import { createVPhoneInput, selectPhoneCountryInput, VPhoneCountryFlagSvg } from 'v-phone-input';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// [!code ++:4]
const vPhoneInput = createVPhoneInput({
  ...selectPhoneCountryInput,
  countryDisplayComponent: VPhoneCountryFlagSvg,
});

// [!code ++]
app.use(vPhoneInput);

app.mount('#app');
```

<<< ./snippets/component/SignInForm.vue [SignInForm.vue]

:::

::: warning
Do not forget to:

- import VPhoneInput css file, and appropriate flags files if needed;
- use either `selectPhoneCountryInput` or `autocompletePhoneCountryInput`, otherwise
  phone country input would not display.

:::

## Model values

`VPhoneInput` provides two-way data bindings through two component
[`v-model`](https://vuejs.org/guide/components/v-model):

- [`modelValue`](/api/interfaces/VPhoneInputProps#modelValue): the formatted phone
  number value;
- [`country`](/api/interfaces/VPhoneInputProps#country-1): the current country.

This provides:

- Two-way property binding: `v-model="phone"` or `v-model:country="phone"`;
- One-way property binding: `:model-value="..."`;
- Listener binding: `@update:model-value="onPhoneChange"`.

::: info

Be aware that modifying the `modelValue` property with a formatted phone number containing
its country information (such as an E164 formatted number, prefixed with country dial code)
might update the country property to the phone current country.

:::

## Configuration

### Properties

To configure `VPhoneInput`, you can pass properties directly to the component.
You can explore available properties inside compatible features guides, or directly
browse [`VPhoneInputProps`](/api/interfaces/VPhoneInputProps)
for an exhaustive list where every property is described with its purpose, remarks
and default value if available.

Please note that `VPhoneInput` also inherit every property from
[Vuetify's `VTextField`](https://vuetifyjs.com/en/api/v-text-field/).
Within the inherited properties, some properties will be passed to both the country
and phone inputs: [`vPhoneInputSharedProperties`](/api/variables/vPhoneInputSharedProperties).
Other properties will only be forwarded to the phone input.

<<< ./snippets/component/Config.vue

### Plugin options

If you want to share behavior or properties between multiple `VPhoneInput` usage within your
application, you can pass default options to `createVPhoneInput` plugin factory.

Default option will only be used when input properties are not already given.
You can find an exhaustive list of plugin options inside
[`VPhoneInputPluginOptions`](/api/interfaces/VPhoneInputPluginOptions).

```ts
createVPhoneInput({
  ...selectPhoneCountryInput,
  countryDisplayComponent: VPhoneCountryFlagSvg,
  label: 'Phone',
  // ...
});
```

::: tip
You can also provide default options after plugin registration, by using
[`providePhoneInputOptions`](/guide/composable#providing-default-options).
:::

### Slots

Finally, you can also customize `VPhoneInput` behavior using slots.
You can find an exhaustive list of available slots inside
[`VPhoneInputSlots`](/api/interfaces/VPhoneInputSlots).

In addition to direct input slots, such as
[`country-display`](/api/interfaces/VPhoneInputSlots#country-display),
slots named `country-input:<name>` will be forwarded to the country input,
and slots named `<name>` will be forwarded to the phone input.

<<< ./snippets/component/Slots.vue

## Events

In addition to [model values](#model-values), `VPhoneInput` emits multiple
events to let the parent component react to internal state changes.
Those are documented inside [`VPhoneInputEmits`](/api/interfaces/VPhoneInputEmits).

## Exposed

`VPhoneInput` exposes multiple values for advanced customization, which are documented inside
[`VPhoneInputExposed`](/api/interfaces/VPhoneInputExposed).

## Additional information

### Generic type parameters

Please note that `VPhoneInput` is a
[generic Vue component](https://vuejs.org/guide/typescript/overview#generic-components).
It has two type parameters:

- `Country` which represent a country object extending
  [`VPhoneInputCountryObject`](/api/interfaces/VPhoneInputCountryObject)
- `CountryInputComponent` which represent the country input component in use. It is either
  a `VSelect` or a `VAutocomplete`.

If you are using render functions, please
[read the dedicated render functions usage section](#render-functions).

### Usage in Nuxt

Inside a Nuxt application, you must mark `v-phone-input` as a transpiled package and define
a Nuxt plugin instead of a simple Vue plugin.

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  build: {
    transpile: [
      'vuetify',
      // [!code ++]
      'v-phone-input',
    ],
  },
});
```

```ts [app/plugins/vPhoneInputPlugin.ts]
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/styles';
import { createVPhoneInput, selectPhoneCountryInput, VPhoneCountryFlagSvg } from 'v-phone-input';

export default defineNuxtPlugin((nuxtApp) => {
  const vPhoneInput = createVPhoneInput({
    ...selectPhoneCountryInput,
    countryDisplayComponent: VPhoneCountryFlagSvg,
  });

  nuxtApp.vueApp.use(vPhoneInput);
});
```

:::

### Usage in render functions

Since [VPhoneInput is a generic component](#generic-type-parameters),
you will need to manually specify its type parameters when using render functions:

::: code-group

```ts [select]
import { defineComponent, h } from 'vue';
import type { VSelect } from 'vuetify/components';
import { VPhoneInput, selectPhoneCountryInput, type VPhoneInputCountryObject } from 'v-phone-input';

export default defineComponent({
  render: () => h(
    VPhoneInput<VPhoneInputCountryObject, typeof VSelect>,
    { ...selectPhoneCountryInput },
  ),
});
```

```ts [autocomplete]
import { defineComponent, h } from 'vue';
import type { VAutocomplete } from 'vuetify/components';
import { VPhoneInput, autocompletePhoneCountryInput, type VPhoneInputCountryObject } from 'v-phone-input';

export default defineComponent({
  render: () => h(
    VPhoneInput<VPhoneInputCountryObject, typeof VAutocomplete>,
    { ...autocompletePhoneCountryInput },
  ),
});
```

:::
