[v-phone-input](../globals.md) / VPhoneInputCountryProps

# Interface: VPhoneInputCountryProps\<Country\>

Defined in: dist/types.d.ts:76

**`Internal`**

Props to customize country related features.

## Extends

- [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`ExtractPropTypes`\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<*typeof* `makePhoneInputCountryProps`\>\>\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### countries?

> `readonly` `optional` **countries**: `Country`[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:35

List of available countries.

#### Default Value

Use `countries-list` two-letter codes, dial codes resolved using
`awesome-phonenumber` package's `getCountryCodeForRegionCode`, and
given locale (or `en`) translated names using `Intl.DisplayNames`.

#### Inherited from

`Readonly.countries`

***

### countryLocale?

> `readonly` `optional` **countryLocale**: `string`

Defined in: dist/props/makePhoneInputCountryProps.d.ts:15

Locale to use when localizing country names.

#### Default Value

`'en'`

#### Inherited from

`Readonly.countryLocale`

***

### countryName()?

> `readonly` `optional` **countryName**: (`iso2`) => `string`

Defined in: dist/props/makePhoneInputCountryProps.d.ts:24

Resolve a country name from its ISO-2 code.

#### Parameters

##### iso2

`string`

#### Returns

`string`

#### Default Value

Uses `Intl.DisplayNames` to localize the country name in defined `countryLocale`.

#### Inherited from

`Readonly.countryName`

***

### defaultCountry?

> `readonly` `optional` **defaultCountry**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)

Defined in: dist/props/makePhoneInputCountryProps.d.ts:74

Default country to use.

#### Default Value

```ts
First country from the available countries list.
```

#### Inherited from

`Readonly.defaultCountry`

***

### excludeCountries?

> `readonly` `optional` **excludeCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:65

List of countries to exclude.

#### Remarks

When specified, any country which is in this list will be excluded
from available countries.

#### Inherited from

`Readonly.excludeCountries`

***

### includeCountries?

> `readonly` `optional` **includeCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:55

List of countries to include.

#### Remarks

When specified, any country which is not in this list will be excluded
from available countries.

#### Inherited from

`Readonly.includeCountries`

***

### preferCountries?

> `readonly` `optional` **preferCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:45

List of countries to prefer.

#### Remarks

When specified, any country which is in the list will appear first
in available countries.

#### Inherited from

`Readonly.preferCountries`
