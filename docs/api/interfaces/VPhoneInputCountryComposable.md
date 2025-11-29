[v-phone-input](../globals.md) / VPhoneInputCountryComposable

# Interface: VPhoneInputCountryComposable\<Country\>

Defined in: dist/types.d.ts:90

**`Internal`**

`usePhoneInputCountries` composable.

## Extended by

- [`VPhoneInputComposable`](VPhoneInputComposable.md)

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### countries

> `readonly` **countries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:94

List of available countries.

***

### defaultCountry

> `readonly` **defaultCountry**: `ComputedRef`\<`Country` \| `null`\>

Defined in: dist/types.d.ts:106

Default country to use.

***

### fallbackCountry

> `readonly` **fallbackCountry**: `ComputedRef`\<`Country`\>

Defined in: dist/types.d.ts:110

Fallback country to use.

***

### findCountry

> `readonly` **findCountry**: `ComputedRef`\<(`value`) => `Country` \| `null`\>

Defined in: dist/types.d.ts:114

Find a country object using a country object or two-letter code.

***

### preferredCountries

> `readonly` **preferredCountries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:98

List of available preferred countries.

***

### unpreferredCountries

> `readonly` **unpreferredCountries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:102

List of available unpreferred countries.
