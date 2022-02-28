# VPhoneInput

International phone field for Vuetify 2.0 and Vue JS 2.

- Standardized value using E164 formatted phone numbers (example: +330123456789).
- Searchable countries, validation, automatic format when a phone number is valid, and many more.
- Modulable with customizable country's icon component customization, labels, validation message,
  etc.
- Accessibility friendly with SR only adapted namings.

Proudly supported by the [CoWork'HIT](https://coworkhit.com).

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
}
</script>
```

## Documentation

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
| `value`                  | `string`                   | `''`                           | Value of the phone input. You may use it using `v-model` or `@input` (see [Handling input example](#handling-input)).             |

## Options

Plugin options are used to change some default behavior of the input or globally customize default
values for [input props](#props).

| Name                      | Type                                                      | Default                                                                   | Description                                                                                                                                                                                  |
|---------------------------|-----------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `countryIconComponent`    | `VueConstructor`                                          | `VPhoneCountryFlag`                                                       | A vue component to display a country icon (flag, ISO-2 code, etc.). The component will receive a [`Country` object](#country) and a `decorative` boolean.                                    |
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

#### Handling input

TODO

#### Validation

TODO

#### Enabling searching countries

TODO

#### Localization

TODO

### Types

#### Country

A country object contains information about a country.

```javascript
const country = {
  name: "France",
  iso2: "FR",
  dialCode: "33",
}
```

#### Country Guesser

A country guesser is a class implementing `CountryGuesser` interface and provides a `guess` method
to detect the default country to use.

```javascript
class FrDefaultCountryGuesser {
  guess() {
    return Promise.resolve('FR');
  }
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
