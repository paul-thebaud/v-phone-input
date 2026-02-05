# Vue composable

[`usePhoneInput`](/api/functions/usePhoneInput) is a Vue composable
you can use to create a custom phone input component. It is used internally by
UI frameworks implementations, such as the [`VPhoneInput`](/api/variables/VPhoneInput) Vuetify component.

## Installation

::: code-group

```sh [npm]
$ npm add v-phone-input
```

```sh [pnpm]
$ pnpm add v-phone-input
```

```sh [yarn]
$ yarn add v-phone-input
```

```sh [bun]
$ bun add v-phone-input
```

:::

## Usage

When using the composable, the first thing to do is to define your reusable
phone input component. Inside it, you can use `usePhoneInput`.

In the following example, we define a `PhoneInput` component which supports
a custom label property and country/phone models. It will render the input
through the native HTML `select` and `input` elements.

After that, the `PhoneInput` component is used inside a `SignInForm` component.

::: code-group
<<< ../snippets/composable/Definition.vue [PhoneInput.vue]
<<< ../snippets/composable/SignInForm.vue [SignInForm.vue]
:::

::: info
Passing `countryInputRef` and `phoneInputRef` is currently only used for
[on-`blur` phone formatting](/composable/formatting).
:::

## Configuration

### Composable options

To configure `usePhoneInput`, you can pass an options object. You can explore
available options inside compatible features guides. You can also browse
[`VPhoneInputComposableOptions`](/api/interfaces/VPhoneInputComposableOptions)
for an exhaustive list where every option is described with its goal, remarks
and default value if available.

Most options are using [`MaybeRef`](https://vuejs.org/api/utility-types#mayberef),
which means those can be passed as ref or direct values. Passing a ref will
make the related behaviors reactive: as an example, passing a reactive
[`displayFormat`](/api/interfaces/VPhoneInputComposableOptions#displayFormat)
will make the input value format on every change.

::: info
Only the required
[`modelValue`](/api/interfaces/VPhoneInputComposableOptions#modelValue),
and optional [`country`](/api/interfaces/VPhoneInputComposableOptions#country-1),
[`countryInputRef`](/api/interfaces/VPhoneInputComposableOptions#countryInputRef),
and [`phoneInputRef`](/api/interfaces/VPhoneInputComposableOptions#phoneInputRef)
must be refs and cannot be direct values.
:::

<<< ../snippets/composable/Config.vue

### Providing default options

If you want to define default values for options, you can also use
[`providePhoneInputOptions`](/api/functions/providePhoneInputOptions)
to a parent of the component using `usePhoneInput`.

::: code-group

<<< ../snippets/composable/Provider.vue [PhoneInputOptionsProvider.vue]

<<< ../snippets/composable/ProviderUsage.vue [SomeComponent.vue]

:::

## API reference

You can check out every option and provided value from the composable
by reading [`usePhoneInput`](/api/functions/usePhoneInput).
