[v-phone-input](../globals.md) / VPhoneInputMessagesComposableOptions

# Interface: VPhoneInputMessagesComposableOptions\<Country\>

Defined in: dist/types.d.ts:162

**`Internal`**

Options for `usePhoneInputMessages` composable.

## Extends

- [`VPhoneInputExtractComposableOptions`](../type-aliases/VPhoneInputExtractComposableOptions.md)\<[`VPhoneInputMessagesProps`](VPhoneInputMessagesProps.md)\<`Country`\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### ariaLabel?

> `readonly` `optional` **ariaLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:38

Customize the phone input `aria-label`.

#### Inherited from

`VPhoneInputExtractComposableOptions.ariaLabel`

***

### country

> `readonly` **country**: `MaybeRef`\<`Country`\>

Defined in: dist/types.d.ts:166

Country to resolve messages with.

***

### countryAriaLabel?

> `readonly` `optional` **countryAriaLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:53

Customize the country input `aria-label`.

#### Default Value

`'Country for <label>'`

#### Inherited from

`VPhoneInputExtractComposableOptions.countryAriaLabel`

***

### countryLabel?

> `readonly` `optional` **countryLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:44

Customize the country input label.

#### Inherited from

`VPhoneInputExtractComposableOptions.countryLabel`

***

### example?

> `readonly` `optional` **example**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`, `undefined`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:23

Customize the phone input example.

#### Default Value

Use `awesome-phonenumber` package's `getExample` function with current country.

#### Inherited from

`VPhoneInputExtractComposableOptions.example`

***

### exampleFormat?

> `readonly` `optional` **exampleFormat**: `MaybeRef`\<[`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:14

Format example phone.

#### Remarks

Using `null` will disable formating example phone numbers.

#### Default Value

`displayFormat` value if available, `'national'` otherwise.

#### Inherited from

`VPhoneInputExtractComposableOptions.exampleFormat`

***

### invalidMessage?

> `readonly` `optional` **invalidMessage**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:69

Customize the phone input invalid message returned by the
`validate` function generated rule.

#### Default Value

`'The "<label>" field is not a valid phone number (example: <example>).'`

#### Inherited from

`VPhoneInputExtractComposableOptions.invalidMessage`

***

### label?

> `readonly` `optional` **label**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:32

Customize the phone input label.

#### Default Value

`'Phone'`

#### Inherited from

`VPhoneInputExtractComposableOptions.label`

***

### placeholder?

> `readonly` `optional` **placeholder**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:59

Customize the phone input placeholder.

#### Inherited from

`VPhoneInputExtractComposableOptions.placeholder`
