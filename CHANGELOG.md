# Change log

## 2.0.0

Migration to ViteJS bundler and dependencies upgrade.

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
