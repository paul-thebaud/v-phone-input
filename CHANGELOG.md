# Change log

## 2.0.1

Change V2 tag on NPM to be `v2`. Installation of the package for Vue 2 should
now use `v-phone-input@v2`.

## 2.0.0

Migration to Vite bundler, plugin registration changes and dependencies upgrade.

**BREAKING**

Check the [migration guide](README.md#migrate-from-1xx-to-2xx) inside the documentation.

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
