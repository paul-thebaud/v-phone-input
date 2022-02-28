# VPhoneInput

[![Tests](https://github.com/paul-thebaud/v-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/paul-thebaud/v-phone-input/actions/workflows/tests.yml)
![NPM version](https://img.shields.io/npm/v/v-phone-input)
![NPM downloads](https://img.shields.io/npm/dt/v-phone-input)
![MIT license](https://img.shields.io/npm/l/v-phone-input)

International phone field for [Vuetify 2.0](http://vuetifyjs.com) and
[Vue JS 2](https://vuejs.org/).

- Standardized value using E164 formatted phone numbers (example: +330123456789).
- Searchable countries, validation, automatic format when a phone number is valid, and many more.
- Modulable with customizable country's icon component, labels, validation message, etc.
- Accessibility friendly with SR only adapted namings.

Proudly supported by the [CoWork'HIT](https://coworkhit.com).

**Motivation:** There are already multiple libraries to provide phone number input on Vuetify. But
for those already published are not actively maintained or does not put focus on providing great
accessibility. This new library aims to provide those two.

## TD;DR

Installation using Yarn:

```shell
yarn add v-phone-input flag-icons
```

Installation using NPM:

```shell
npm install v-phone-input flag-icons
```

Plugin installation:

```javascript
import Vue from 'vue';
import VPhoneInputPlugin from 'v-phone-input';
import 'flag-icons/css/flag-icons.min.css';

Vue.use(VPhoneInputPlugin);
```

Component usage:

```vue

<template>
  <v-phone-input v-model="phone" />
</template>

<script>
export default {
  data: () => ({ phone: '' }),
};
</script>
```

## Documentation

### Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Slots](#slots)
- [Options](#options)
- [Examples](#examples)
    - [Validation](#validation)
    - [Enabling searching countries](#enabling-searching-countries)
    - [Localization](#localization)
- [Types](#types)
    - [Country ISO-2](#country-iso-2)
    - [Country](#country)
    - [Country Guesser](#country-guesser)
    - [Phone Number Formats](#phone-number-formats)
    - [Phone Number](#phone-number)

### Requirements

VPhoneInput requires `Vue@2` and `Vuetify@2` to be installed and working in your project.

### Installation

You can install this package though Yarn:

```shell
yarn add v-phone-input flag-icons
```

Or NPM:

```shell
npm install v-phone-input flag-icons
```

> `flag-icons` package is required if you want the input to display countries' flags.

### Usage

You can globally define the input using the provided plugin. This will register the `v-phone-input`
component globally.

```javascript
import Vue from 'vue';
import VPhoneInputPlugin from 'v-phone-input';
import 'flag-icons/css/flag-icons.min.css';

const options = {};

Vue.use(VPhoneInputPlugin, options);
```

You may also only define the field on a per-file basis. Notice that with this method, you won't be
able to define default [options](#options) for the input.

```vue

<template>
  <v-phone-input v-model="phone" />
</template>

<script>
import { VPhoneInput } from 'v-phone-input';
import 'flag-icons/css/flag-icons.min.css';

export default {
  components: { VPhoneInput },
  data: () => ({ phone: '' }),
};
</script>
```

### Props

VPhoneInput provides many props to customize the input behaviors or display. Each prop may be passed
directly to the input or defined globally using [input options](#options).

| Name                     | Type                       | Default                        | Description                                                                                                                       |
|--------------------------|----------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `label`                  | `string`                   | `'Phone'`                      | The phone input label.                                                                                                            |
| `countryLabel`           | `string`                   | `'Country'`                    | The country input label.                                                                                                          |
| `hideCountryLabel`       | `string`                   | `false`                        | Hide the country label.                                                                                                           |
| `countryAriaLabel`       | `string` or `undefined`    | `undefined`                    | Override the value returned by `computeCountryAriaLabel` option (see [Options](#options)).                                        |
| `allCountries`           | `Country[]`                | `TODO`                         | Array of countries to use.                                                                                                        |
| `preferredCountries`     | `CountryIso2[]`            | `[]`                           | Array of countries' codes to propose as first option of country input.                                                            |
| `onlyCountries`          | `CountryIso2[]`            | `[]`                           | Array of countries' codes to display as options of country input (will hide others).                                              |
| `ignoreCountries`        | `CountryIso2[]`            | `[]`                           | Array of countries' codes to hide from country input.                                                                             |
| `defaultCountry`         | `CountryIso2`              | `undefined`                    | Default country to select when not guessing nor detecting from current value.                                                     |
| `countryGuesser`         | `CountryGuesser`           | `new MemoIp2cCountryGuesser()` | Country guesser implementation to use when guessing country (see [Country Guesser](#country-guesser)).                            |
| `disableGuessingCountry` | `boolean`                  | `false`                        | Disable guessing country.                                                                                                         |
| `disableGuessLoading`    | `boolean`                  | `false`                        | Disable passing the country input in a loading state when guessing country.                                                       |
| `enableSearchingCountry` | `boolean`                  | `false`                        | Turns the country input into a `VAutocomplete` input (see [Enabling searching countries example](#enabling-searching-countries)). |
| `disableValidation`      | `boolean`                  | `false`                        | Disable the phone number automatic validation. You can still use `rules` props to validate the input.                             |
| `invalidMessage`         | `string` or `undefined`    | `undefined`                    | Override the value returned by `computeInvalidMessage` option (see [Options](#options)).                                          |
| `rules`                  | `Function[]` or `string[]` | `[]`                           | Additional rules to pass to phone input (see [Validation example](#validation)).                                                  |
| `displayFormat`          | `PhoneNumberFormat`        | `'national'`                   | Format to use when displaying valid phone numbers (see [Phone Number Formats](#phone-number-formats)).                            |
| `value`                  | `string`                   | `''`                           | Value of the phone input. You may use it using `v-model` or `@input`.                                                             |

## Slots

TODO

## Options

Plugin options are used to change some default behavior of the input or globally customize default
values for [input props](#props).

| Name                      | Type                                                      | Default                                                                   | Description                                                                                                                                                                                  |
|---------------------------|-----------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `countryIconComponent`    | `VueConstructor` or `string` or `undefined`               | `VPhoneCountryFlag`                                                       | A vue component to display a country icon (flag, ISO-2 code, etc.). The component will receive a [`Country` object](#country) and a `decorative` boolean.                                    |
| `computeCountryAriaLabel` | `(options: { label: string }) => string`                  | `'Country for {label}'`                                                   | A function returning the `aria-label` of the country input. Function will receive an options object containing the phone input label, and must return a string.                              |
| `computeInvalidMessage`   | `(options: { label: string, example: string }) => string` | `'The "{label}" field is not a valid phone number (example: {example}).'` | A function returning the message when phone input is invalid. Function will receive an options object containing the phone input label and a phone number example, and must return a string. |

You may customize the options when registering the Vue plugin:

```javascript
import Vue from 'vue';
import VPhoneInputPlugin from 'v-phone-input';

Vue.use(VPhoneInputPlugin, {
  // Customize the way country icon are displayed.
  countryIconComponent: {
    props: { country: Object },
    functional: true,
    render: (h, c) => h('span', c.props.country.iso2),
  },
  // Customize aria-label of country input.
  computeCountryAriaLabel: ({ label }) => `Pays pour ${label}`,
  // Customize invalid message of phone input.
  computeInvalidMessage: ({ label, example }) =>
    `Le champ ${label} n'est pas un numéro de téléphone valide (exemple : ${example}).`,
});
```

Options may also be used to define custom default values for `VPhoneInput` props:

```javascript
import Vue from 'vue';
import VPhoneInputPlugin, { Ip2cCountryGuesser } from 'v-phone-input';

Vue.use(VPhoneInputPlugin, {
  disableGuessLoading: true,
  disableGuessingCountry: true,
  enableSearchingCountry: true,
  countryGuesser: new Ip2cCountryGuesser(),
});
```

### Examples

#### Validation

By default (when `disableValidation` is `false`), the input will validate that the phone number is a
valid one by injecting a rules to the phone text input.

You may add any additional rules by providing a `rules` prop to the input:

```vue

<template>
  <v-phone-input :rules="rules" />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        (value, country, phone) => !!value || 'Phone is required.',
      ];
    },
  },
};
</script>
```

Any rule you pass as a function will receive 3 arguments (instead of one for default Vuetify rules)
that you may use when validating user's input:

- `value`: the value contained in the phone text input.
- `country`: the country selected in the country input.
- `phone`: the [phone number object](#phone-number).

#### Enabling searching countries

You may provide a `enableSearchingCountry` with a `true` value to enable textual search in
countries.

> Since VPhoneInput does not import VAutocomplete to reduce its weight, you must provide this
> component to Vue when dynamically using Vuetify components (e.g. when using `vuetify-loader`).

To enable searching countries on a per-input basis:

```vue

<template>
  <v-phone-input enable-searching-country />
</template>

<script>
import { VAutocomplete } from 'vuetify/lib';

export default {
  // Required when dynamically using Vuetify components.
  components: { VAutocomplete },
};
</script>
```

To enable searching countries for all inputs as a default behavior:

```javascript
import Vue from 'vue';
import { VAutocomplete } from 'vuetify/lib';
import VPhoneInputPlugin from 'v-phone-input';

// Required when dynamically using Vuetify components.
Vue.component('VAutocomplete', VAutocomplete);

Vue.use(VPhoneInputPlugin, { enableSearchingCountry: true });
```

#### Localization

You may change the translations of the input by providing custom values for the following translated
props:

- `label`: label for the phone text input.
- `countryLabel`: label for the country select input.
- `countryAriaLabel` or `computeCountryAriaLabel`: `aria-label` for the country select input. This
  is useful to make the country input related to the phone input.
- `invalidMessage` or `computeInvalidMessage`: message displayed when the phone number is invalid.

Translations can be defined on a per-input basis (example in French):

```vue

<template>
  <v-phone-input
      label="Numéro de téléphone"
      country-label="Pays"
      country-aria-label="Pays pour le numéro de téléphone"
      invalid-message="Le numéro de téléphone doit être un numéro de téléphone valide (exemple : 01 23 45 67 89)."
  />
</template>
```

Translations can also be defined for all inputs as a default behavior (example in French):

```javascript
import Vue from 'vue';
import VPhoneInputPlugin from 'v-phone-input';

// Without any localization library.
Vue.use(VPhoneInputPlugin, {
  label: 'Numéro de téléphone',
  countryLabel: 'Pays',
  computeCountryAriaLabel: ({ label }) => `Pays pour ${label}`,
  computeInvalidMessage: ({
                            label,
                            example
                          }) => `Le champ ${label} doit être un numéro de téléphone valide (exemple : ${example}).`,
});

// Using Vue-I18N localization library.
import i18n from './path/to/i18n-plugin';

Vue.use(VPhoneInputPlugin, {
  label: i18n.t('phone.phoneLabel'),
  countryLabel: i18n.t('phone.phoneCountry'),
  computeCountryAriaLabel: (options) => i18n.t('phone.phoneCountryFor', options),
  computeInvalidMessage: (options) => i18n.t('phone.invalidPhoneGiven', options),
});
```

### Types

#### Country ISO-2

A country ISO-2 code is a string containing 2 uppercase characters.

```typescript
type CountryIso2 = string;
```

#### Country

A country object contains information about a country.

```typescript
interface Country {
  name: string;       // Example: "France".
  iso2: CountryIso2;  // Example: "FR".
  dialCode: string;   // Example: "33".
}
```

#### Country Guesser

A country guesser is a class implementing `CountryGuesser` interface and provides a `guess` method
to detect the default country to use.

```typescript
interface CountryGuesser {
  guess: () => Promise<CountryIso2>;
}
```

This package ships with two `CountryGuesser` implementations:

- `Ip2cCountryGuesser` which uses [IP2C service](https://ip2c.org) to guess the country from the
  client's IP.
- `MemoIp2cCountryGuesser` (default) which memoize the result of `Ip2cCountryGuesser`.

#### Phone Number Formats

A phone number format is a string representing a format, allowing to change the display format of a
phone number in input. Here are the available format (provided
by [awesome-phonenumber](https://www.npmjs.com/package/awesome-phonenumber)):

- `e164`: `+46707123456`
- `international`: `+46 70 712 34 56`
- `national`: `070-712 34 56`
- `rfc3966`: `tel:+46-70-712-34-56`
- `significant`: `707123456`

#### Phone Number

A phone number is a simple object describing the VPhoneInput current value. The `number` key will
contain an `input` string and may contain each formatted value if the phone number is valid.

```typescript
type PhoneNumberObject = {
  number: { input: string } & Partial<Record<PhoneNumberFormat, string>>;
  possibility: string;
  possible: boolean;
  valid: boolean;
  regionCode: CountryIso2 | undefined;
}
```

## Contributing

Please see [CONTRIBUTING file](CONTRIBUTING.md) for more details.

Informal discussion regarding bugs, new features, and implementation of existing features takes
place in the
[GitHub issue page this repository](https://github.com/paul-thebaud/v-phone-input/issues).

## Credits

- [Paul Thébaud](https://github/paul-thebaud)
- [CoWork'HIT](https://coworkhit.com)
- [All Contributors](https://github.com/paul-thebaud/v-phone-input/graphs/contributors)

## License

PhpUnitGen is an open-sourced software licensed under the
[MIT license](https://opensource.org/licenses/MIT).
