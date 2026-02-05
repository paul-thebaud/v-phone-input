[v-phone-input](../globals.md) / VPhoneInputNonModelEmits

# Interface: VPhoneInputNonModelEmits\<Country\>

Defined in: dist/types.d.ts:317

**`Internal`**

Component events for `VPhoneInput` (without models events).

## Extended by

- [`VPhoneInputEmits`](VPhoneInputEmits.md)

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### update:country-object

> **update:country-object**: \[`Country`\]

Defined in: dist/types.d.ts:321

Country object value has been updated (computed from country input value).

***

### update:phone-object

> **update:phone-object**: \[[`ParsedPhoneNumber`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage) \| `null`\]

Defined in: dist/types.d.ts:325

Phone object value has been updated (computed from phone input value).
