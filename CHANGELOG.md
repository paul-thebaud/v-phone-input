# Change log

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
