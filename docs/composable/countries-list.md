# Countries list

VPhoneInput provides many ways to customize the countries list, in addition to
[country display](/vuetify/country-display) or [slots](/vuetify/getting-started#slots).

## Default list

By default, VPhoneInput uses [countries-list](https://www.npmjs.com/package/countries-list)
package, and its minimal
[`countries.2to3.min.json`](https://github.com/annexare/Countries/blob/main/dist/minimal/countries.2to3.min.json)
file, to get a full list of country ISO-2 codes. It then resolves the name through
[`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames#region_code_display_names)
and the dial code
using [`awesome-phonenumber.getCountryCodeForRegionCode`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#country-codes).
Finally, it sorts countries by name using [`localeCompare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

## Preferring countries

If you want to mark some countries as preferred, and make them appear before any other country,
you can use [`preferCountries`](/api/interfaces/VPhoneInputProps#preferCountries) property.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  preferCountries: ['FR', 'BE'],
});
```

## Including countries

If you want only some countries to be displayed, you can use
[`includeCountries`](/api/interfaces/VPhoneInputProps#includeCountries) property.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  includeCountries: ['FR', 'BE'],
});
```

## Excluding countries

If you want to exclude some countries from the list, you can use
[`excludeCountries`](/api/interfaces/VPhoneInputProps#excludeCountries) property.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  excludeCountries: ['FR', 'BE'],
});
```

## Changing country locale

You can change the country name locale by passing a
[`countryLocale`](/api/interfaces/VPhoneInputProps#countryLocale)
property with the locale of your choice. The locale must be supported by the browser
to produce correct names.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  countryLocale: 'fr-FR',
});
```

::: tip
If your application supports multiple locales, you should pass `countryLocale` as
a `VPhoneInput` component property (for component usage)
or as a computed option (for composable usage).
:::

## Changing country name resolver

If you want to opt-out from using `Intl.DisplayNames` for country names localization,
you can pass a [`countryName`](/api/interfaces/VPhoneInputProps#countryName)
property with a resolver function. Here is an example with the default implementation behavior.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++:2]
  countryName: (countryIso2) => new Intl.DisplayNames(['en'], { type: "region" })
    .of(countryIso2) ?? countryIso2,
});
```

## Changing whole countries list

If you need additional country data, you can pass a custom list of countries.

[`VPhoneInput`](/api/variables/VPhoneInput) and
[`usePhoneInput`](/api/functions/usePhoneInput) are generic and support any custom country objects
which extends [`VPhoneInputCountryObject`](/api/interfaces/VPhoneInputCountryObject).

To use a custom countries list, just pass a
[`countries`](/api/interfaces/VPhoneInputProps#countries) property.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++:14]
  countries: [
    {
      name: 'France',
      iso2: 'FR',
      iso3: 'FRA',
      dialCode: '33',
    },
    {
      name: 'Belgique',
      iso2: 'BE',
      iso3: 'BEL',
      dialCode: '32',
    },
  ],
});
```
