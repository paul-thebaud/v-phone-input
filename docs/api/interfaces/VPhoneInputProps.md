[v-phone-input](../globals.md) / VPhoneInputProps

# Interface: VPhoneInputProps\<Country, CountryInputComponent\>

Defined in: dist/types.d.ts:302

**`Internal`**

Component props for `VPhoneInput`.

## Extends

- [`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md)\<`Country`, `CountryInputComponent`\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

### CountryInputComponent

`CountryInputComponent` *extends* [`VPhoneCountryInputComponent`](../type-aliases/VPhoneCountryInputComponent.md)

## Properties

### ariaLabel?

> `readonly` `optional` **ariaLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:38

Customize the phone input `aria-label`.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`ariaLabel`](VPhoneInputNonModelProps.md#arialabel)

***

### countries?

> `readonly` `optional` **countries**: `Country`[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:30

List of available countries.

#### Default Value

Use `countries-list` two-letter codes, dial codes resolved using
`awesome-phonenumber` package's `getCountryCodeForRegionCode`, and
given locale (or `en`) translated names using `Intl.DisplayNames`.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countries`](VPhoneInputNonModelProps.md#countries)

***

### country?

> `optional` **country**: `string` \| `null`

Defined in: dist/types.d.ts:310

Currently selected country.

***

### countryAriaLabel?

> `readonly` `optional` **countryAriaLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:53

Customize the country input `aria-label`.

#### Default Value

`'Country for <label>'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryAriaLabel`](VPhoneInputNonModelProps.md#countryarialabel)

***

### countryDisplayComponent?

> `readonly` `optional` **countryDisplayComponent**: `Component`\<[`VPhoneCountryDisplayProps`](VPhoneCountryDisplayProps.md)\<`Country`\>\>

Defined in: dist/props/makePhoneInputProps.d.ts:26

Country display component.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryDisplayComponent`](VPhoneInputNonModelProps.md#countrydisplaycomponent)

***

### countryInputComponent?

> `readonly` `optional` **countryInputComponent**: \[\{ `type`: `PropType`\<`CountryInputComponent`\>; \}\] *extends* \[`Prop`\<`V`, `D`\>\] ? `unknown` *extends* `V` ? keyof `V` *extends* `never` ? `IfAny`\<`V`, `V`, `D`\> : `V` : `V` : `object`

Defined in: dist/props/makePhoneInputProps.d.ts:12

**`Internal`**

Country input component.

 Use `usePhoneInput` instead if you want to use a custom component.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryInputComponent`](VPhoneInputNonModelProps.md#countryinputcomponent-1)

***

### countryInputComponentProps?

> `readonly` `optional` **countryInputComponentProps**: \[\{ `type`: `PropType`\<`ComponentProps`\<`CountryInputComponent`\>\>; \}\] *extends* \[`Prop`\<`V`, `D`\>\] ? `unknown` *extends* `V` ? keyof `V` *extends* `never` ? `IfAny`\<`V`, `V`, `D`\> : `V` : `V` : `object`

Defined in: dist/props/makePhoneInputProps.d.ts:20

**`Internal`**

Country input component specific props.

 Use `countryProps` property instead.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryInputComponentProps`](VPhoneInputNonModelProps.md#countryinputcomponentprops)

***

### countryLabel?

> `readonly` `optional` **countryLabel**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:44

Customize the country input label.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryLabel`](VPhoneInputNonModelProps.md#countrylabel)

***

### countryLocale?

> `readonly` `optional` **countryLocale**: `string`

Defined in: dist/props/makePhoneInputCountryProps.d.ts:10

Locale to use when localizing country names.

#### Default Value

`'en'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryLocale`](VPhoneInputNonModelProps.md#countrylocale)

***

### countryName()?

> `readonly` `optional` **countryName**: (`iso2`) => `string`

Defined in: dist/props/makePhoneInputCountryProps.d.ts:19

Resolve a country name from its ISO-2 code.

#### Parameters

##### iso2

`string`

#### Returns

`string`

#### Default Value

Uses `Intl.DisplayNames` to localize the country name in defined `countryLocale`.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryName`](VPhoneInputNonModelProps.md#countryname)

***

### countryProps?

> `readonly` `optional` **countryProps**: \[\{ `type`: `PropType`\<`ComponentProps`\<`CountryInputComponent`\>\>; \}\] *extends* \[`Prop`\<`V`, `D`\>\] ? `unknown` *extends* `V` ? keyof `V` *extends* `never` ? `IfAny`\<`V`, `V`, `D`\> : `V` : `V` : `object`

Defined in: dist/props/makePhoneInputProps.d.ts:45

Properties to pass to the country input (`VSelect` or `VAutocomplete`).

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`countryProps`](VPhoneInputNonModelProps.md#countryprops)

***

### defaultCountry?

> `readonly` `optional` **defaultCountry**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)

Defined in: dist/props/makePhoneInputCountryProps.d.ts:69

Default country to use.

#### Default Value

```ts
First country from the available countries list.
```

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`defaultCountry`](VPhoneInputNonModelProps.md#defaultcountry)

***

### displayFormat?

> `readonly` `optional` **displayFormat**: [`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null`

Defined in: dist/props/makePhoneInputComposableProps.d.ts:36

Format phone number for text input value.

#### Remarks

This only applies to valid phone numbers.
Using `null` will disable format feature and keep the input as is.

#### Default Value

`'national'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`displayFormat`](VPhoneInputNonModelProps.md#displayformat)

***

### displayFormatDelay?

> `readonly` `optional` **displayFormatDelay**: `number` \| `boolean`

Defined in: dist/props/makePhoneInputComposableProps.d.ts:50

Delay (in milliseconds) before formatting the phone number
for text input value when detecting an input.

#### Remarks

This only applies to valid phone numbers.
Using `0` will format immediately after input.

#### Default Value

`1000` if `displayFormatOnBlur` is disabled.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`displayFormatDelay`](VPhoneInputNonModelProps.md#displayformatdelay)

***

### displayFormatOnBlur?

> `readonly` `optional` **displayFormatOnBlur**: `boolean`

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

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`displayFormatOnBlur`](VPhoneInputNonModelProps.md#displayformatonblur)

***

### example?

> `readonly` `optional` **example**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:23

Customize the phone input example.

#### Default Value

Use `awesome-phonenumber` package's `getExample` function with current country.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`example`](VPhoneInputNonModelProps.md#example)

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

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`exampleFormat`](VPhoneInputNonModelProps.md#exampleformat)

***

### excludeCountries?

> `readonly` `optional` **excludeCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:60

List of countries to exclude.

#### Remarks

When specified, any country which is in this list will be excluded
from available countries.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`excludeCountries`](VPhoneInputNonModelProps.md#excludecountries)

***

### guessCountry?

> `readonly` `optional` **guessCountry**: [`VPhoneInputCountryGuesser`](VPhoneInputCountryGuesser.md)

Defined in: dist/props/makePhoneInputComposableProps.d.ts:10

Guess the country of the user.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`guessCountry`](VPhoneInputNonModelProps.md#guesscountry)

***

### guessLoading?

> `readonly` `optional` **guessLoading**: `boolean`

Defined in: dist/props/makePhoneInputProps.d.ts:32

Toggle country input loading state whenever a country is currently guessing.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`guessLoading`](VPhoneInputNonModelProps.md#guessloading)

***

### hint?

> `readonly` `optional` **hint**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputProps.d.ts:57

Customize the phone input hint.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`hint`](VPhoneInputNonModelProps.md#hint)

***

### includeCountries?

> `readonly` `optional` **includeCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:50

List of countries to include.

#### Remarks

When specified, any country which is not in this list will be excluded
from available countries.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`includeCountries`](VPhoneInputNonModelProps.md#includecountries)

***

### invalidMessage?

> `readonly` `optional` **invalidMessage**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:69

Customize the phone input invalid message returned by the
`validate` function generated rule.

#### Default Value

`'The "<label>" field is not a valid phone number (example: <example>).'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`invalidMessage`](VPhoneInputNonModelProps.md#invalidmessage)

***

### label?

> `readonly` `optional` **label**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`, `undefined`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:32

Customize the phone input label.

#### Default Value

`'Phone'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`label`](VPhoneInputNonModelProps.md#label)

***

### modelFormat?

> `readonly` `optional` **modelFormat**: [`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats) \| `null`

Defined in: dist/props/makePhoneInputComposableProps.d.ts:23

Format phone number for `modelValue` updates.

#### Remarks

This only applies to valid phone numbers.
Using `null` will disable format feature and keep the input as is.

#### Default Value

`'e164'`

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`modelFormat`](VPhoneInputNonModelProps.md#modelformat)

***

### modelValue?

> `optional` **modelValue**: `string` \| `null`

Defined in: dist/types.d.ts:306

Current phone number, formatted using `modelFormat`.

***

### phoneProps?

> `readonly` `optional` **phoneProps**: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<\{ `active`: `boolean`; `autofocus`: `boolean`; `centerAffix`: `boolean`; `clearable`: `boolean`; `clearIcon`: `IconValue`; `density`: `Density`; `direction`: `"horizontal"` \| `"vertical"`; `dirty`: `boolean`; `disabled`: `boolean`; `error`: `boolean`; `errorMessages`: `string` \| readonly `string`[] \| `null`; `flat`: `boolean`; `focused`: `boolean`; `glow`: `boolean`; `hideSpinButtons`: `boolean`; `maxErrors`: `string` \| `number`; `messages`: `string` \| readonly `string`[]; `persistentClear`: `boolean`; `persistentCounter`: `boolean`; `persistentHint`: `boolean`; `persistentPlaceholder`: `boolean`; `readonly`: `boolean` \| `null`; `reverse`: `boolean`; `rounded`: `string` \| `number` \| `boolean`; `rules`: readonly (`string` \| `boolean` \| `PromiseLike`\<`ValidationResult`\> \| \[`string`, `any`, `string`?\] \| (`value`) => `ValidationResult` \| (`value`) => `PromiseLike`\<`ValidationResult`\>)[]; `singleLine`: `boolean`; `style`: `StyleValue`; `tile`: `boolean`; `type`: `string`; `variant`: `"filled"` \| `"outlined"` \| `"plain"` \| `"solo"` \| `"solo-filled"` \| `"solo-inverted"` \| `"underlined"`; \}\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & `VNodeProps` & `AllowedComponentProps` & `ComponentCustomProps`, `"type"` \| `"active"` \| `"autofocus"` \| `"centerAffix"` \| `"clearIcon"` \| `"clearable"` \| `"density"` \| `"direction"` \| `"dirty"` \| `"disabled"` \| `"error"` \| `"errorMessages"` \| `"flat"` \| `"focused"` \| `"glow"` \| `"hideSpinButtons"` \| `"maxErrors"` \| `"messages"` \| `"persistentClear"` \| `"persistentCounter"` \| `"persistentHint"` \| `"persistentPlaceholder"` \| `"readonly"` \| `"reverse"` \| `"rounded"` \| `"rules"` \| `"singleLine"` \| `"style"` \| `"tile"` \| `"variant"`\>\>

Defined in: dist/props/makePhoneInputProps.d.ts:51

Properties to pass to the country input (`VTextField`).

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`phoneProps`](VPhoneInputNonModelProps.md#phoneprops)

***

### placeholder?

> `readonly` `optional` **placeholder**: [`VPhoneInputMessage`](../type-aliases/VPhoneInputMessage.md)\<`Country`\>

Defined in: dist/props/makePhoneInputMessagesProps.d.ts:59

Customize the phone input placeholder.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`placeholder`](VPhoneInputNonModelProps.md#placeholder)

***

### preferCountries?

> `readonly` `optional` **preferCountries**: [`VPhoneInputCountryObjectOrIso2`](../type-aliases/VPhoneInputCountryObjectOrIso2.md)[]

Defined in: dist/props/makePhoneInputCountryProps.d.ts:40

List of countries to prefer.

#### Remarks

When specified, any country which is in the list will appear first
in available countries.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`preferCountries`](VPhoneInputNonModelProps.md#prefercountries)

***

### validate?

> `readonly` `optional` **validate**: (`phone`) => `boolean` \| `null`

Defined in: dist/props/makePhoneInputComposableProps.d.ts:80

Validate a phone number.

#### Remarks

Using `null` will disable the validation.

#### Default Value

`valid` property value of the given `ParsedPhoneNumber` object.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`validate`](VPhoneInputNonModelProps.md#validate)

***

### wrapperAttrs?

> `readonly` `optional` **wrapperAttrs**: `HTMLAttributes` & `ReservedProps` & [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>

Defined in: dist/props/makePhoneInputProps.d.ts:39

Properties to pass to the wrapper div.

#### Inherited from

[`VPhoneInputNonModelProps`](VPhoneInputNonModelProps.md).[`wrapperAttrs`](VPhoneInputNonModelProps.md#wrapperattrs)
