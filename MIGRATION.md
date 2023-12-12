# Migration

## Migrate from 3.x.x to 4.x.x

If you are coming from `2.x.x`, you should also follow
the ["Migrate from 2.x.x to 3.x.x" guide](#migrate-from-2xx-to-3xx).

Upgrade the package version with Yarn:

```shell
yarn upgrade v-phone-input@^4.0.0
```

From version `4.0.0`, `v-phone-input` is using awesome-phonenumber v6.
All functions and types have been updated to use awesome-phonenumber's
`ParsedPhoneNumber` type, instead of a library internal type. As a consequence:

- `PhoneNumberObject` and `ExtendedPhoneNumber` types have been removed, and
  a awesome-phonenumber's `ParsedPhoneNumber` object is used instead.
  `ParsedPhoneNumber` does not provide methods anymore (such as `isValid()`),
  you should now use the properties instead (such as `valid`).
- `makePhone` will now return a `ParsedPhoneNumber` object.
- `makeExample` will now return a `ParsedPhoneNumber` object.
- `formatPhone` will now take a `ParsedPhoneNumber` object as its first argument.

## Migrate from 2.x.x to 3.x.x

If you are coming from `1.x.x`, you should also follow
the ["Migrate from 1.x.x to 2.x.x" guide](#migrate-from-1xx-to-2xx).

> From version `3.0.0`, `v-phone-input` is using Vuetify 3 and Vue 3 and is only compatible with
> those. As a consequence, some undocumented props or events inherited from Vuetify or Vue have
> changed (e.g. `value` is now `modelValue`, `filled` is now `variant="filled"`
> or `@input` is now `@update:modelValue`). The input style has also changed a lot to follow
> the new Vuetify classes' names.

Upgrade the package version with Yarn:

```shell
yarn upgrade v-phone-input@^3.0.0
```

You might also update your code if you are using the following features which changed:

- Configuration option and prop `preferredCountries` renamed to `preferCountries`.
- Configuration option and prop `onlyCountries` renamed to `includeCountries`.
- Configuration option and prop `ignoredCountries` renamed to `excludeCountries`.
- Configuration option and prop `disableGuessingCountries` changed to `guessCountry`. This new
  property does the inverse of the previous one and defaults to `false`, because IP2C service is
  regularly throwing timeouts.
- `PhoneUtils` class has been decomposed into independent functions (`makePhone`, `makeExample`
  and `formatPhone`) to provide better ESM tree shaking.
- Exported component `VPhoneCountrySprite` renamed to `VCountryIconSprite` with changed
  behavior (`role="img"` with `title` instead of `d-sr-only` span).
- Exported component `VPhoneCountrySvg` renamed to `VCountryIconSvg` with changed
  behavior (`role="img"` with `title` instead of `d-sr-only` span).
- Changed `awesome-phonenumber` dependency from `^2.69.0` to `^3.0.0`.
- Changed `vue` peer dependency from `^2.6.14` to `^3.0.0`.
- Changed `vuetify` peer dependency from `^2.6.4` to `^3.0.0`.

## Migrate from 1.x.x to 2.x.x

Upgrade the package version with Yarn:

```shell
yarn upgrade v-phone-input@^2.0.0
```

If you are using the plugin the global plugin registration method, you need to update the file where
you are defining it:

```diff
  import Vue from 'vue';
- import VPhoneInputPlugin from 'v-phone-input';
+ import { createVPhoneInput } from 'v-phone-input';
+ import 'v-phone-input/dist/v-phone-input.css';
  import 'flag-icons/css/flag-icons.min.css';

- Vue.use(VPhoneInputPlugin, { countryIconMode: 'svg' });
+ const vPhoneInput = createVPhoneInput({ countryIconMode: 'svg' });
+ Vue.use(vPhoneInput);
```

> CSS have been extracted to a file, so you'll also need to
> import `v-phone-input/dist/v-phone-input.css` (even if you are using the per-file registration),
> like in the example above.
