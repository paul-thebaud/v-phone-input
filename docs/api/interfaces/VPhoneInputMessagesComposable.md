[v-phone-input](../globals.md) / VPhoneInputMessagesComposable

# Interface: VPhoneInputMessagesComposable\<Country\>

Defined in: dist/types.d.ts:173

**`Internal`**

`usePhoneInputMessages` composable.

## Extended by

- [`VPhoneInputComposable`](VPhoneInputComposable.md)

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### ariaLabel

> `readonly` **ariaLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:185

`aria-label` for phone input.

***

### countryAriaLabel

> `readonly` **countryAriaLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:193

`aria-label` for country input.

***

### countryLabel

> `readonly` **countryLabel**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:189

Label for country input.

***

### example

> `readonly` **example**: `ComputedRef`\<`string`\>

Defined in: dist/types.d.ts:177

Formatted example of phone number for current country.

***

### invalidMessage

> `readonly` **invalidMessage**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:201

Invalid message for phone input.

***

### label

> `readonly` **label**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:181

Label for phone input.

***

### placeholder

> `readonly` **placeholder**: `ComputedRef`\<`string` \| `undefined`\>

Defined in: dist/types.d.ts:197

Placeholder for phone input.

***

### resolveMessage

> `readonly` **resolveMessage**: `ComputedRef`\<\<`Message`\>(`message`) => `Message` *extends* `null` \| `undefined` ? `string` \| `undefined` : `string`\>

Defined in: dist/types.d.ts:205

Resolve a message using current context.
