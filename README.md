# VPhoneInput

[![Tests](https://github.com/paul-thebaud/v-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/paul-thebaud/v-phone-input/actions/workflows/tests.yml)
[![Publish](https://github.com/paul-thebaud/v-phone-input/actions/workflows/publish.yml/badge.svg)](https://github.com/paul-thebaud/v-phone-input/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/paul-thebaud/v-phone-input/branch/main/graph/badge.svg?token=75BHV1FRQ9)](https://codecov.io/gh/paul-thebaud/v-phone-input)
[![NPM version](https://img.shields.io/npm/v/v-phone-input)](https://www.npmjs.com/package/v-phone-input)
![NPM downloads](https://img.shields.io/npm/dt/v-phone-input)
![MIT license](https://img.shields.io/npm/l/v-phone-input)

VPhoneInput aims to provide international phone number tools for Vue and Vuetify.

Depending on your needs, you should get start with one of the following:

- [`usePhoneInput`](https://paul-thebaud.github.io/v-phone-input/composable/getting-started),
  a [Vue composable](https://vuejs.org/guide/reusability/composables.html)
  composable to ease your custom implementation within any Vue project.
- [`VPhoneInput`](https://paul-thebaud.github.io/v-phone-input/vuetify/getting-started), a ready-to-use
  [Vuetify](https://vuetifyjs.com/) component, based on `VSelect` or
  `VAutocomplete` components for country selection, and `VTextField` for phone
  number.

## Try it online

If you would like to try VPhoneInput, you can check out:

- [the Vue composable StackBlitz project](https://stackblitz.com/edit/v-phone-input-composable?file=src%2FApp.vue&terminal=dev)
- [the Vuetify component StackBlitz project](https://stackblitz.com/edit/v-phone-input?file=src%2FApp.vue&terminal=dev)
- [the Vuetify component docs' playground](https://paul-thebaud.github.io/v-phone-input/vuetify/playground)

## Migration to v6

If you are using VPhoneInput v5 and would you like to migrate to v6, you
should follow the [v6 migration guide](https://paul-thebaud.github.io/v-phone-input/migration).

## Vue 2 support

Since v3, VPhoneInput is only available in Vuetify 3 and Vue 3. If you are using
Vuetify 2 and Vue 2, you can still
[install the package's v2](https://github.com/paul-thebaud/v-phone-input/tree/2.x.x).

## Motivation

There are already multiple libraries to provide phone number input on Vuetify.
But for those already published are not actively maintained or does not put focus
on providing great accessibility. This new library aims to provide both.

## Contributing

Please see [contributing guide](https://paul-thebaud.github.io/v-phone-input/contributing)
for more details.

## Credits

- [Paul Thébaud](https://github/paul-thebaud)
- [CoWork'HIT](https://coworkhit.com)
- [All Contributors](https://github.com/paul-thebaud/v-phone-input/graphs/contributors)

Inspired by [vue-tel-input](https://github.com/iamstevendao/vue-tel-input)
and [vue-tel-input-vuetify](https://github.com/yogakurniawan/vue-tel-input-vuetify).

## License

`v-phone-input` is an open-sourced software licensed under the
[MIT license](https://opensource.org/licenses/MIT).
