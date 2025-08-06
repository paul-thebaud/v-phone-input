# Change log

## unreleased

### Features

- feat: add `country-input` slot
- feat: add `phone-input` slot
- chore: use script setup for `VPhoneInput`

## 5.0.0

Check the [migration guide](MIGRATION.md#migrate-from-4xx-to-5xx).

### Features

- **BREAKING** feat: forward exposed vuetify properties (#55)
- feat: search country by dial code (#54)
- feat: add `phoneValidator` property (#31)
- feat: remove label in favor of aria-label on country input
- feat: upgrade to `awesome-phonenumber` v7

## 4.5.0

### Features

- feat: remove label in favor of only aria-label on country input

## 4.4.2

### Bug fixes

- fix: emit E164 formatted number only when it is valid (closes #48)

## 4.4.1

### Features

- feat: use `string` instead of `CountryIso2` type (closes #47)

### Deprecations

- `CountryIso2` type alias has been deprecated, use `string` instead.

## 4.4.0

### Features

- feat: add `rounded` property (thanks to #42)

## 4.3.2

### Bug fixes

- fix: export missing types (see #40)

## 4.3.1

### Bug fixes

- fix: remove unused dependency

## 4.3.0

### Features

- feat: add `country-selection` slot (closes #39)
- feat: add default value to `decorative` prop of icon components

## 4.2.2

### Bug fixes

- fix: attributes inheritance and documentation on behavior (closes #37)

## 4.2.1

### Bug fixes

- fix: publish package under `latest` npm tag

## 4.2.0

### Features

- feat: rely on [`countries-list`](https://www.npmjs.com/package/countries-list)
  instead of [`country-telephone-data`](https://www.npmjs.com/package/country-telephone-data)
  for countries names and includes it in build.
- feat: display native name of the country first (instead of showing `EN` name)

## 4.1.2

### Bug fixes

- fix: types definition references inside `package.json` (closes #26)

## 4.1.1

### Bug fixes

- fix: exclude unsupported countries from countries list to avoid unexpected errors
- fix: only run validation trigger when phone number input is filled with a value (closes #21)

## 4.1.0

### Features

- feat: order preferred countries using passed `preferCountries` prop (closes #19)
- feat: add an `example` property to customize shown example (closes #20)

### Demo app

- feat: add flag icon package to installation code blocks in demo app
- feat: add pnpm installation code block in demo app

## 4.0.1

### Bug fixes

- fix: show preferred countries first in country selection list (closes #17)

## 4.0.0

Migration to `awesome-phonenumber` V6.

**BREAKING**

Check the [migration guide](MIGRATION.md#migrate-from-3xx-to-4xx).

Summary:

- Phone number object and helpers have changed to use `awesome-phonenumber` V6
  objects.
- If you are only using string phone values without any helper functions
  (`makePhone`, `makeExample` or `formatPhone`), no change should be required
  by this new version.

## 3.0.6

### Bug fixes

- fix: height of country input on latest vuetify versions

## 3.0.5

### Bug fixes

- fix: more consistent country input height (closes #12)

## 3.0.4

### Bug fixes

- externalize vuetify imports from production build

## 3.0.3

### Features

- support for `validate-on` property (closes #10)

### Bug fixes

- improve country input height to always match text field height

## 3.0.2

Publish v3 as latest version on NPM.

## 3.0.1

Fix phone input width when having long messages.

## 3.0.0

Migration to Vuetify 3 and Vue 3, props and exported modules changes, dependencies upgrade.

**BREAKING**

Check the [migration guide](MIGRATION.md#migrate-from-2xx-to-3xx).

Summary:

- Vuetify 3 and Vue 3 required instead of Vuetify 2 and Vue 2.
- Some props and exported modules names and behavior changes.

## 2.0.0

Migration to Vite bundler, plugin registration changes and dependencies upgrade.

**BREAKING**

Check the [migration guide](MIGRATION.md#migrate-from-1xx-to-2xx).

Summary:

- Plugin is now created using a factory exported as a named
  member `createVPhoneInput`. Options need to be passed to this factory instead of
  the `Vue.use` registration.
- CSS styles have been extracted into a dedicated `dist/v-phone-input.css`.

## 1.5.0

**Added**

- `PreferableCountryGuesser` to keep the selected country across multiple guess calls.
- `StorageMemoIp2cCountryGuesser` to memoize guessed country inside a storage implementation (
  defaults to `localStorage`).

**Changed**

- `MemoIp2cCountryGuesser` and `StorageMemoIp2cCountryGuesser` implements
  the `PreferableCountryGuesser` interface and store the preferred country as the memoized one.

## 1.4.0

**Added**

- Issue #2: using input with only one country will auto select it without guessing.

**Fixed**

- Entering an invalid E164 number will keep the previously selected country.

## 1.3.0

**Added**

- `awesome-phonenumber` lib access using `PhoneUtils.AwesomePhoneNumber`.

## 1.1.0

**Added**

- `PhoneUtils` exported class for manipulating phone numbers (creating from input or examples,
  formatting).

## 1.0.0

Initial release.
