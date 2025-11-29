[v-phone-input](../globals.md) / VPhoneInputMessageFactory

# Type Alias: VPhoneInputMessageFactory()\<Country, Label, Example\>

> **VPhoneInputMessageFactory**\<`Country`, `Label`, `Example`\> = (`context`) => `string`

Defined in: dist/types.d.ts:143

**`Internal`**

Build a message for a given context.

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](../interfaces/VPhoneInputCountryObject.md)

### Label

`Label` *extends* `string` \| `undefined` = `string`

### Example

`Example` *extends* `string` \| `undefined` = `string`

## Parameters

### context

[`VPhoneInputMessageFactoryContext`](../interfaces/VPhoneInputMessageFactoryContext.md)\<`Country`, `Label`, `Example`\>

## Returns

`string`
