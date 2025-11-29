[v-phone-input](../globals.md) / VPhoneInputEmits

# Interface: VPhoneInputEmits\<Country\>

Defined in: dist/types.d.ts:332

**`Internal`**

Component events for `VPhoneInput`.

## Extends

- [`VPhoneInputNonModelEmits`](VPhoneInputNonModelEmits.md)\<`Country`\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### update:country

> **update:country**: \[`string`\]

Defined in: dist/types.d.ts:340

Currently selected country has been updated.

***

### update:country-object

> **update:country-object**: \[`Country`\]

Defined in: dist/types.d.ts:321

Country object value has been updated (computed from country input value).

#### Inherited from

[`VPhoneInputNonModelEmits`](VPhoneInputNonModelEmits.md).[`update:country-object`](VPhoneInputNonModelEmits.md#updatecountry-object)

***

### update:model-value

> **update:model-value**: \[`string` \| `null` \| `undefined`\]

Defined in: dist/types.d.ts:336

Current phone number has been updated.

***

### update:phone-object

> **update:phone-object**: \[[`ParsedPhoneNumber`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage) \| `null`\]

Defined in: dist/types.d.ts:325

Phone object value has been updated (computed from phone input value).

#### Inherited from

[`VPhoneInputNonModelEmits`](VPhoneInputNonModelEmits.md).[`update:phone-object`](VPhoneInputNonModelEmits.md#updatephone-object)
