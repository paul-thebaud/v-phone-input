[v-phone-input](../globals.md) / VPhoneInputComposableOptions

# Interface: VPhoneInputComposableOptions\<Country\>

Defined in: dist/types.d.ts:212

**`Internal`**

Options for `usePhoneInput` composable.

## Extends

- [`VPhoneInputExtractComposableOptions`](../type-aliases/VPhoneInputExtractComposableOptions.md)\<[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`ExtractPropTypes`\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<*typeof* `makePhoneInputComposableProps`\>\>\>\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### ariaLabel?

> `readonly` `optional` **ariaLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\> \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:43

Customize the phone input `aria-label`.

#### Inherited from

`VPhoneInputExtractComposableOptions.ariaLabel`

***

### countries?

> `readonly` `optional` **countries**: `MaybeRef`\<`Country`[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:35

List of available countries.

#### Default Value

Uses `countries-list` two-letter codes, dial codes resolved using
`awesome-phonenumber` package's `getCountryCodeForRegionCode`, and
given locale (or `en`) translated names using `Intl.DisplayNames`.

#### Inherited from

`VPhoneInputExtractComposableOptions.countries`

***

### country?

> `readonly` `optional` **country**: `Ref`\<`string` \| `null` \| `undefined`, `string` \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:220

Country model value ref.

***

### countryAriaLabel?

> `readonly` `optional` **countryAriaLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:61

Customize the country input `aria-label`.

#### Default Value

`'Country for <label>'` when using the component, `null` otherwise.

#### Inherited from

`VPhoneInputExtractComposableOptions.countryAriaLabel`

***

### countryInputRef?

> `readonly` `optional` **countryInputRef**: `Ref`\<\{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `null` \| `undefined`, \{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:224

Country input component or element ref to bind listeners to.

***

### countryLabel?

> `readonly` `optional` **countryLabel**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:52

Customize the country input label.

#### Default Value

`'Country for <label>'` when using the composable, `null` otherwise.

#### Inherited from

`VPhoneInputExtractComposableOptions.countryLabel`

***

### countryLocale?

> `readonly` `optional` **countryLocale**: `MaybeRef`\<`string` \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:15

Locale to use when localizing country names.

#### Default Value

`'en'`

#### Inherited from

`VPhoneInputExtractComposableOptions.countryLocale`

***

### countryName?

> `readonly` `optional` **countryName**: `MaybeRef`\<(`iso2`) => `string` \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:24

Resolve a country name from its ISO-2 code.

#### Default Value

Uses `Intl.DisplayNames` to localize the country name in defined `countryLocale`.

#### Inherited from

`VPhoneInputExtractComposableOptions.countryName`

***

### defaultCountry?

> `readonly` `optional` **defaultCountry**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md) \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:74

Default country to use.

#### Default Value

First country from the available `countries` list.

#### Inherited from

`VPhoneInputExtractComposableOptions.defaultCountry`

***

### displayFormat?

> `readonly` `optional` **displayFormat**: `MaybeRef`\<[`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:36

Format phone number for text input value.

#### Remarks

This only applies to valid phone numbers.
Using `null` will disable format feature and keep the input as is.

#### Default Value

`'national'`

#### Inherited from

`VPhoneInputExtractComposableOptions.displayFormat`

***

### displayFormatDelay?

> `readonly` `optional` **displayFormatDelay**: `MaybeRef`\<`number` \| `boolean` \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:50

Delay (in milliseconds) before formatting the phone number
for text input value when detecting an input.

#### Remarks

This only applies to valid phone numbers.
Using `0` will format immediately after input.

#### Default Value

`1000` if `displayFormatOnBlur` is disabled.

#### Inherited from

`VPhoneInputExtractComposableOptions.displayFormatDelay`

***

### displayFormatOnBlur?

> `readonly` `optional` **displayFormatOnBlur**: `MaybeRef`\<`boolean` \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:67

Format the phone number for text input only on blur event.

#### Remarks

This bypass the `displayFormatDelay` option, and only format the phone
number on blur event or on `displayFormat` property change.
Using `false` will restore the `displayFormatDelay` behavior.
When using the composable, it is required to bind `countryInputRef` and
`phoneInputRef` to appropriate focusable inputs.

#### Default Value

`true`

#### Inherited from

`VPhoneInputExtractComposableOptions.displayFormatOnBlur`

***

### example?

> `readonly` `optional` **example**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`, `undefined`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:28

Customize the phone input example.

#### Default Value

Use `awesome-phonenumber` package's `getExample` function with current country.

#### Inherited from

`VPhoneInputExtractComposableOptions.example`

***

### exampleFormat?

> `readonly` `optional` **exampleFormat**: `MaybeRef`\<[`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:19

Format example phone.

#### Remarks

Using `null` will disable formating example phone numbers.

#### Default Value

`displayFormat` value if available, `'national'` otherwise.

#### Inherited from

`VPhoneInputExtractComposableOptions.exampleFormat`

***

### excludeCountries?

> `readonly` `optional` **excludeCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:65

List of countries to exclude.

#### Remarks

When specified, any country which is in this list will be excluded
from available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.excludeCountries`

***

### guessCountry?

> `readonly` `optional` **guessCountry**: `MaybeRef`\<[`VPhoneInputCountryGuesser`](VPhoneInputCountryGuesser.md) \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:10

Guess the country of the user.

#### Inherited from

`VPhoneInputExtractComposableOptions.guessCountry`

***

### includeCountries?

> `readonly` `optional` **includeCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:55

List of countries to include.

#### Remarks

When specified, any country which is not in this list will be excluded
from available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.includeCountries`

***

### invalidMessage?

> `readonly` `optional` **invalidMessage**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:77

Customize the phone input invalid message returned by the
`validate` function generated rule.

#### Default Value

`'The "<label>" field is not a valid phone number (example: <example>).'`

#### Inherited from

`VPhoneInputExtractComposableOptions.invalidMessage`

***

### label?

> `readonly` `optional` **label**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\> \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:37

Customize the phone input label.

#### Default Value

`'Phone'`

#### Inherited from

`VPhoneInputExtractComposableOptions.label`

***

### modelFormat?

> `readonly` `optional` **modelFormat**: `MaybeRef`\<[`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:23

Format phone number for `modelValue` updates.

#### Remarks

This only applies to valid phone numbers.
Using `null` will disable format feature and keep the input as is.

#### Default Value

`'e164'`

#### Inherited from

`VPhoneInputExtractComposableOptions.modelFormat`

***

### modelValue

> `readonly` **modelValue**: `Ref`\<`string` \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:216

Phone model value ref, formatted using `modelFormat`.

***

### phoneInputRef?

> `readonly` `optional` **phoneInputRef**: `Ref`\<[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| \{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| `null` \| `undefined`, [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| \{ `$el`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \} \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:230

Phone input component or element ref to bind listeners to.

***

### placeholder?

> `readonly` `optional` **placeholder**: `MaybeRef`\<[`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\> \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:67

Customize the phone input placeholder.

#### Inherited from

`VPhoneInputExtractComposableOptions.placeholder`

***

### preferCountries?

> `readonly` `optional` **preferCountries**: `MaybeRef`\<[`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[] \| `undefined`\>

Defined in: dist/props/makePhoneInputCountryProps.d.ts:45

List of countries to prefer.

#### Remarks

When specified, any country which is in the list will appear first
in available countries.

#### Inherited from

`VPhoneInputExtractComposableOptions.preferCountries`

***

### validate?

> `readonly` `optional` **validate**: `MaybeRef`\<(`phone`, `country`) => `boolean` \| `null` \| `undefined`\>

Defined in: dist/props/makePhoneInputComposableProps.d.ts:81

Validate a phone number.

#### Remarks

Using `null` will disable the validation.

#### Default Value

Ensure `ParsedPhoneNumber.valid` is true and `ParsedPhoneNumber.regionCode` is a selectable
country (not excluded from the countries list).

#### Inherited from

`VPhoneInputExtractComposableOptions.validate`
