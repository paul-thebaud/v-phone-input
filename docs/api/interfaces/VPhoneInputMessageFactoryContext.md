[v-phone-input](../globals.md) / VPhoneInputMessageFactoryContext

# Interface: VPhoneInputMessageFactoryContext\<Country, Label, Example\>

Defined in: dist/types.d.ts:124

**`Internal`**

Message factory context.

## Remarks

Context may vary depending on the message to build.

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

### Label

`Label` *extends* `string` \| `undefined` = `string`

### Example

`Example` *extends* `string` \| `undefined` = `string`

## Properties

### country

> `readonly` **country**: `Country`

Defined in: dist/types.d.ts:128

Current country.

***

### example

> `readonly` **example**: `Example`

Defined in: dist/types.d.ts:132

Current country's phone number example.

***

### label

> `readonly` **label**: `Label`

Defined in: dist/types.d.ts:136

Current phone input's label.
