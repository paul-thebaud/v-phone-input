[v-phone-input](../globals.md) / VPhoneInputCountryComposableOptions

# Interface: VPhoneInputCountryComposableOptions\<Country\>

Defined in: dist/types.d.ts:83

**`Internal`**

Options for `usePhoneInputCountries` composable.

## Extends

- [`VPhoneInputExtractComposableOptions`](../type-aliases/VPhoneInputExtractComposableOptions.md)\<[`VPhoneInputCountryProps`](VPhoneInputCountryProps.md)\<`Country`\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### countries?

> `readonly` `optional` **countries**: `MaybeRef`\<`Country`[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:35

List of available countries.

#### Default Value

Uses `countries-list` two-letter codes, dial codes resolved using
`awesome-phonenumber` package's `getCountryCodeForRegionCode`, and
given locale (or `en`) translated names using `Intl.DisplayNames`.

#### Inherited from

`VPhoneInputExtractComposableOptions.countries`

***

### countryLocale?

> `readonly` `optional` **countryLocale**: `MaybeRef`\<`string` \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:15

Locale to use when localizing country names.

#### Default Value

`'en'`

#### Inherited from

`VPhoneInputExtractComposableOptions.countryLocale`

***

### countryName?

> `readonly` `optional` **countryName**: `MaybeRef`\<(`iso2`) => `string` \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:24

Resolve a country name from its ISO-2 code.

#### Default Value

Uses `Intl.DisplayNames` to localize the country name in defined `countryLocale`.

#### Inherited from

`VPhoneInputExtractComposableOptions.countryName`

***

### defaultCountry?

> `readonly` `optional` **defaultCountry**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md) \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:74

Default country to use.

#### Default Value

First country from the available `countries` list.

#### Inherited from

`VPhoneInputExtractComposableOptions.defaultCountry`

***

### excludeCountries?

> `readonly` `optional` **excludeCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:65

List of countries to exclude.

#### Remarks

When specified, any country which is in this list will be excluded
from available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.excludeCountries`

***

### includeCountries?

> `readonly` `optional` **includeCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:55

List of countries to include.

#### Remarks

When specified, any country which is not in this list will be excluded
from available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.includeCountries`

***

### preferCountries?

> `readonly` `optional` **preferCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:45

List of countries to prefer.

#### Remarks

When specified, any country which is in the list will appear first
in available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.preferCountries`
