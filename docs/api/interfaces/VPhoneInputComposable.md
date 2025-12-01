[v-phone-input](../globals.md) / VPhoneInputComposable

# Interface: VPhoneInputComposable\<Country\>

Defined in: dist/types.d.ts:239

**`Internal`**

`usePhoneInput` composable.

## Extends

- [`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md)\<`Country`\>.[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md)\<`Country`\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### ariaLabel

> `readonly` **ariaLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:185

`aria-label` for phone input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`ariaLabel`](VPhoneInputMessagesComposable.md#arialabel)

***

### countries

> `readonly` **countries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:94

List of available countries.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`countries`](VPhoneInputCountryComposable.md#countries)

***

### countryAriaLabel

> `readonly` **countryAriaLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:193

`aria-label` for country input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`countryAriaLabel`](VPhoneInputMessagesComposable.md#countryarialabel)

***

### countryGuessing

> **countryGuessing**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`Ref`\<`boolean`\>\>

Defined in: dist/types.d.ts:271

Tells if a country is currently guessing.

***

### countryInputRef

> **countryInputRef**: `Ref`\<[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| \{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:243

Country input component or element ref on which listeners are bound.

***

### countryLabel

> `readonly` **countryLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:189

Label for country input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`countryLabel`](VPhoneInputMessagesComposable.md#countrylabel)

***

### countryObject

> **countryObject**: `WritableComputedRef`\<`Country`\>

Defined in: dist/types.d.ts:259

Country object value (computed from country input value).

***

### defaultCountry

> `readonly` **defaultCountry**: `ComputedRef`\<`Country` \| `null`\>

Defined in: dist/types.d.ts:106

Default country to use.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`defaultCountry`](VPhoneInputCountryComposable.md#defaultcountry)

***

### example

> `readonly` **example**: `ComputedRef`\<`string`\>

Defined in: dist/types.d.ts:177

Formatted example of phone number for current country.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`example`](VPhoneInputMessagesComposable.md#example)

***

### fallbackCountry

> `readonly` **fallbackCountry**: `ComputedRef`\<`Country`\>

Defined in: dist/types.d.ts:110

Fallback country to use.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`fallbackCountry`](VPhoneInputCountryComposable.md#fallbackcountry)

***

### findCountry

> `readonly` **findCountry**: `ComputedRef`\<(`value`) => `Country` \| `null`\>

Defined in: dist/types.d.ts:114

Find a country object using a country object or two-letter code.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`findCountry`](VPhoneInputCountryComposable.md#findcountry)

***

### formatPhoneInputValue()

> **formatPhoneInputValue**: () => `void`

Defined in: dist/types.d.ts:275

Trigger phone input value formatting.

#### Returns

`void`

***

### invalidMessage

> `readonly` **invalidMessage**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:201

Invalid message for phone input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`invalidMessage`](VPhoneInputMessagesComposable.md#invalidmessage)

***

### label

> `readonly` **label**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:181

Label for phone input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`label`](VPhoneInputMessagesComposable.md#label)

***

### phone

> **phone**: `Ref`\<`string` \| `null`\>

Defined in: dist/types.d.ts:255

Phone input value.

***

### phoneInputRef

> **phoneInputRef**: `Ref`\<[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| \{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:249

Phone input component or element ref on which listeners are bound.

***

### phoneObject

> **phoneObject**: `ComputedRef`\<[`ParsedPhoneNumber`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage) \| `null`\>

Defined in: dist/types.d.ts:263

Phone object value (computed from phone input value).

***

### phoneValid

> **phoneValid**: `ComputedRef`\<`boolean` \| `null`\>

Defined in: dist/types.d.ts:267

Phone object valid state (might be null if validation is disabled).

***

### placeholder

> `readonly` **placeholder**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:197

Placeholder for phone input.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`placeholder`](VPhoneInputMessagesComposable.md#placeholder)

***

### preferredCountries

> `readonly` **preferredCountries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:98

List of available preferred countries.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`preferredCountries`](VPhoneInputCountryComposable.md#preferredcountries)

***

### resolveMessage

> `readonly` **resolveMessage**: `ComputedRef`\<\<`Message`\>(`message`) => `Message` *extends* `null` \| `undefined` ? `string` \| `undefined` : `string`\>

Defined in: dist/types.d.ts:205

Resolve a message using current context.

#### Inherited from

[`VPhoneInputMessagesComposable`](VPhoneInputMessagesComposable.md).[`resolveMessage`](VPhoneInputMessagesComposable.md#resolvemessage)

***

### unpreferredCountries

> `readonly` **unpreferredCountries**: `ComputedRef`\<`Country`[]\>

Defined in: dist/types.d.ts:102

List of available unpreferred countries.

#### Inherited from

[`VPhoneInputCountryComposable`](VPhoneInputCountryComposable.md).[`unpreferredCountries`](VPhoneInputCountryComposable.md#unpreferredcountries)
