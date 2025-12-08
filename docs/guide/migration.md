# Migration to v6

## Before reading

VPhoneInput has been fully rewritten for `v6` to improve its features and provide
a new `usePhoneInput` composable for integrations outside Vuetify. Many API have changed,
so you should read every section of this guide. If you have any question, fill free to
[open an issue on the repository](https://github.com/paul-thebaud/v-phone-input/issues).

This migration guide is mostly using plugin configuration as example of API changes, but
you can also apply those changes to the component properties if that's what you are using.

## Vue and Vuetify support

VPhoneInput now requires Vue **`v3.5.0` or up**, and Vuetify **`v3.10.7` or up**.

## Better TypeScript support

`VPhoneInput` component's typings have been improved to strictly reflect the available properties,
slots, events or exposed values. This may cause legitimate TypeScript errors which were not
emitted previously.

## CSS styles import

CSS styles import path for VPhoneInput have renamed from `v-phone-input/dist/v-phone-input.css`
to `v-phone-input/styles` to match Vuetify styles import path.

```ts
// [!code --]
import 'v-phone-input/dist/v-phone-input.css';
// [!code ++]
import 'v-phone-input/styles';
```

## Removed phone helpers

Before `v6`, VPhoneInput was providing `makePhone`, `makeExample` and `formatPhone`, which
are just helpers in fact calling `awesome-phonenumber` functions. To improve maintainability
and avoid just forwarding calls to a lib's features, those functions are removed.

You should now use `awesome-phonenumber` functions for those features:

```ts
// [!code --]
import { makeExample, makePhone, formatPhone } from 'v-phone-input';
// [!code ++]
import { getExample, parsePhoneNumber } from 'awesome-phonenumber';

// [!code --]
const phone = makePhone('0612345678', 'FR');
// [!code ++]
const phone = parsePhoneNumber('0612345678', { regionCode: 'FR' });

// [!code --]
const example = makeExample('FR');
// [!code ++]
const example = getExample('FR');

// [!code --]
console.log(formatPhone(phone, 'national'));
// [!code ++]
console.log(phone.number?.national ?? phone.number?.input ?? '');
```

## Removed exported countries

The exported `countries` list from the package's root has been removed:

- If you were using the list to manage a custom phone input, you can use
  [`usePhoneInput` composable](/guide/composable).
- Otherwise, you should use your own countries list, as VPhoneInput will not export
  the list anymore (internally, VPhoneInput uses
  [`countries-list` package](https://www.npmjs.com/package/countries-list)).

## Country input mode

Previously, `VPhoneInput` component shipped with default `VSelect` input for country selection.
This behavior created unused code being packaged into production builds when always using
`enableSearchingCountry` property (to display an autocomplete input instead of a select).

To avoid this, `enableSearchingCountry` property has been removed, and you must now pass
either `selectPhoneCountryInput` or `autocompletePhoneCountryInput` to the component props or
the plugin factory. In addition, it is not necessary to register `VAutocomplete` anymore
when using the autocomplete country input.

::: code-group

```ts [select]
// [!code ++]
import { selectPhoneCountryInput } from 'v-phone-input';

createVPhoneInput({
  // [!code ++]
  ...selectPhoneCountryInput,
});
```

```ts [autocomplete]
// [!code ++]
import { autocompletePhoneCountryInput } from 'v-phone-input';

createVPhoneInput({
  // ...
  // [!code --]
  enableSearchingCountry: true,
  // [!code ++]
  ...autocompletePhoneCountryInput,
});
```

:::

## Country display

Country display component have been renamed:

- `VCountryIconSvg` renamed to `VPhoneCountryFlagSvg`
- `VCountryIconSprite` renamed to `VPhoneCountryFlagSprite`

Country display customization property has been renamed to `countryDisplayComponent`
(previously `countryIconMode`). In order to reduce package's footprint, `svg` and `sprite`
possible special values have been removed, and must be replaced with new country display component:

::: code-group

```ts [SVG]
// [!code ++]
import { VPhoneCountryFlagSvg } from 'v-phone-input';

createVPhoneInput({
  // ...
  // [!code --]
  countryIconMode: 'svg',
  // [!code ++]
  countryDisplayComponent: VPhoneCountryFlagSvg,
});
```

```ts [CSS sprite]
// [!code ++]
import { VPhoneCountryFlagSprite } from 'v-phone-input';

createVPhoneInput({
  // ...
  // [!code --]
  countryIconMode: 'sprite',
  // [!code ++]
  countryDisplayComponent: VPhoneCountryFlagSprite,
});
```

```ts [Custom component]
createVPhoneInput({
  // ...
  // [!code --]
  countryIconMode: MyCustomCountryIconComponent,
  // [!code ++]
  countryDisplayComponent: MyCustomCountryIconComponent,
});
```

:::

## Country guessing

Country guessing is now done through a function instead of an object.
`countryGuesser` property is now named `guessCountry`, and `guessCountry` boolean
property has been removed. To disable country guessing (which remains the default behavior),
you must now pass a `null` or `undefined` value to `guessCountry` property.
In addition, `Ip2cCountryGuesser` is replaced by `guessPhoneCountry`.

::: code-group

```ts [enabling country guessing]
// [!code --]
import { Ip2cCountryGuesser } from 'v-phone-input';
// [!code ++]
import { guessPhoneCountry } from 'v-phone-input';

createVPhoneInput({
  // ...
  // [!code --]
  countryGuesser: new Ip2cCountryGuesser(),
  // [!code ++]
  guessCountry: guessPhoneCountry(),
});
```

```ts [disabling country guessing]
// [!code --]
import { Ip2cCountryGuesser } from 'v-phone-input';

createVPhoneInput({
  // ...
  // [!code --:2]
  countryGuesser: new Ip2cCountryGuesser(),
  guessCountry: false,
  // [!code ++]
  guessCountry: null,
});
```

:::

Finally, `MemoIp2cCountryGuesser` and `StorageMemoIp2cCountryGuesser` have been removed.
You can easily create a memoized country guesser using the new `memoizeGuessPhoneCountry`
function. Here are implementation you can use to replace the removed guesser:

::: code-group

```ts [MemoIp2cCountryGuesser]
// [!code --]
import { MemoIp2cCountryGuesser } from 'v-phone-input';
// [!code ++]
import { guessPhoneCountry, memoizeGuessPhoneCountry } from 'v-phone-input';

// [!code ++:8]
let country: string | null = null;
const guessCountry = memoizeGuessPhoneCountry(
  guessPhoneCountry,
  () => country,
  (nextCountry) => {
    country = nextCountry;
  },
);

createVPhoneInput({
  // ...
  // [!code --]
  countryGuesser: new MemoIp2cCountryGuesser(),
  // [!code ++]
  guessCountry: guessPhoneCountry(),
});
```

```ts [StorageMemoIp2cCountryGuesser]
// [!code --]
import { StorageMemoIp2cCountryGuesser } from 'v-phone-input';
// [!code ++]
import { guessPhoneCountry, memoizeGuessPhoneCountry } from 'v-phone-input';

// [!code ++:7]
const guessCountry = memoizeGuessPhoneCountry(
  guessPhoneCountry,
  () => window.localStorage.getItem('v_phone_input_country') || null,
  (nextCountry) => window.localStorage.setItem('v_phone_input_country', nextCountry || null),
);

createVPhoneInput({
  // ...
  // [!code --]
  countryGuesser: new StorageMemoIp2cCountryGuesser(),
  // [!code ++]
  guessCountry: guessPhoneCountry(),
});
```

:::

## Phone number formatting behavior

Prior `v6`, phone formatting would occur every time the phone number was valid, and immediately.
This could lead to unindented input formatting while the user is still typing.
To mitigate this issue, formatting is now done on (country or phone) input blur.

We do not recommend this, but you can restore the previous behavior by defining
`displayFormatDelay` property to `0`.

```ts
createVPhoneInput({
  // [!code warning:2]
  // THIS IS NOT RECOMMENDED!
  displayFormatDelay: 0,
});
```

## Validation

To reduce code complexity, `rules` property of the `VPhoneInput` component does not support
`phone` or `context` additional parameters anymore. This reduces VPhoneInput code complexity
for easier maintenance and tinier build size when this niche feature is not used.
If you are relying on those parameters, you should:

- Rely on available `country` two-way binding to store the country value inside a `ref`, and use
  it later or to produce an example phone number;
- Parse the `phone` yourself from the rule's `value`, for example using `parsePhoneNumber` from
  `awesome-phonenumber`.

Here is a complete example to migrate some/all of your parametized `rules` usage:

<<< ./snippets/migration/Validation.vue

## Slots changes

`country-input` and `phone-input` could previously be used to provide custom input components
to the input. Those two slots are now removed. If you need to fine-tune phone number inputs
components, you should now use [`usePhoneInput` composable](/guide/composable).

In addition, `country-icon` slot has been renamed to `country-display`.

Other slots - direct slots like `country-name` or passed-down slots like
`country-input:prepend-icon` - remain.

## Properties changes

In addition to other changes specified in this guide, multiple properties changed:

- `example` is now receiving an object with a country property instead of a country object;
- `disableGuessLoading` has been replaced by `guessLoading`, which does the opposite;
- `invalidMessage` with `null` will no longer disable validation, but instead will
  make the validation rule returns `false` instead of a message. If you want to disable 
  validation, use `validate` with `null` instead.
- `phoneValidator` has been renamed to `validate`;
- `wrapperProps` has been renamed to `wrapperAttrs`;
