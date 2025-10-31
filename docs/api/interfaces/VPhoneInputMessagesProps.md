[v-phone-input](../globals.md) / VPhoneInputMessagesProps

# Interface: VPhoneInputMessagesProps\<Country\>

Defined in: dist/types.d.ts:155

**`Internal`**

Props to customize localization related features.

## Extends

- [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`ExtractPropTypes`\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<*typeof* `makePhoneInputMessagesProps`\>\>\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### ariaLabel?

> `readonly` `optional` **ariaLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:38

Customize the phone input `aria-label`.

#### Inherited from

`Readonly.ariaLabel`

***

### countryAriaLabel?

> `readonly` `optional` **countryAriaLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:53

Customize the country input `aria-label`.

#### Default Value

`'Country for <label>'`

#### Inherited from

`Readonly.countryAriaLabel`

***

### countryLabel?

> `readonly` `optional` **countryLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:44

Customize the country input label.

#### Inherited from

`Readonly.countryLabel`

***

### example?

> `readonly` `optional` **example**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:23

Customize the phone input example.

#### Default Value

Use `awesome-phonenumber` package's `getExample` function with current country.

#### Inherited from

`Readonly.example`

***

### exampleFormat?

> `readonly` `optional` **exampleFormat**: [`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null`

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:14

Format example phone.

#### Remarks

Using `null` will disable formating example phone numbers.

#### Default Value

`displayFormat` value if available, `'national'` otherwise.

#### Inherited from

`Readonly.exampleFormat`

***

### invalidMessage?

> `readonly` `optional` **invalidMessage**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:69

Customize the phone input invalid message returned by the
`validate` function generated rule.

#### Default Value

`'The "<label>" field is not a valid phone number (example: <example>).'`

#### Inherited from

`Readonly.invalidMessage`

***

### label?

> `readonly` `optional` **label**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:32

Customize the phone input label.

#### Default Value

`'Phone'`

#### Inherited from

`Readonly.label`

***

### placeholder?

> `readonly` `optional` **placeholder**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:59

Customize the phone input placeholder.

#### Inherited from

`Readonly.placeholder`
