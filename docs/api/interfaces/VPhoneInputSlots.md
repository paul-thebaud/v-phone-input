[v-phone-input](../globals.md) / VPhoneInputSlots

# Interface: VPhoneInputSlots\<Country, CountryComponent\>

Defined in: dist/types.d.ts:413

**`Internal`**

Component slots for `VPhoneInput`.

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

### CountryComponent

`CountryComponent` *extends* [`VPhoneCountryInputComponent`](../type-aliases/VPhoneCountryInputComponent.md)

## Properties

### append?

> `readonly` `optional` **append**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"append"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1122

***

### append-inner?

> `readonly` `optional` **append-inner**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"append-inner"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1139

***

### clear?

> `readonly` `optional` **clear**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"clear"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1131

***

### counter?

> `readonly` `optional` **counter**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"counter"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1154

***

### country-append?

> `readonly` `optional` **country-append**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-append"`\]

Defined in: dist/types.d.ts:402

Country list item appended content.

#### Default Value

`'+<country.dialCode>'` if `countryIconMode` property, `country-display` or
`country-prepend` is defined, nothing otherwise.

***

### country-display?

> `readonly` `optional` **country-display**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-display"`\]

Defined in: dist/types.d.ts:373

Country display.

#### Remarks

`decorative` tells if the display should be ignored by screen readers or
if it must have an accessible name (e.g. through `title` attribute).

#### Default Value

Country display component from `countryDisplayComponent` property if available,
`'+<country.dialCode>'` otherwise.

***

### country-input:append?

> `optional` **country-input:append**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:append"`\]

***

### country-input:append-inner?

> `optional` **country-input:append-inner**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:append-inner"`\]

***

### country-input:append-item?

> `optional` **country-input:append-item**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:append-item"`\]

***

### country-input:chip?

> `optional` **country-input:chip**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:chip"`\]

***

### country-input:clear?

> `optional` **country-input:clear**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:clear"`\]

***

### country-input:details?

> `optional` **country-input:details**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:details"`\]

***

### country-input:divider?

> `optional` **country-input:divider**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:divider"`\]

***

### country-input:item?

> `optional` **country-input:item**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:item"`\]

***

### country-input:label?

> `optional` **country-input:label**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:label"`\]

***

### country-input:loader?

> `optional` **country-input:loader**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:loader"`\]

***

### country-input:message?

> `optional` **country-input:message**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:message"`\]

***

### country-input:no-data?

> `optional` **country-input:no-data**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:no-data"`\]

***

### country-input:prepend?

> `optional` **country-input:prepend**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:prepend"`\]

***

### country-input:prepend-inner?

> `optional` **country-input:prepend-inner**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:prepend-inner"`\]

***

### country-input:prepend-item?

> `optional` **country-input:prepend-item**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:prepend-item"`\]

***

### country-input:selection?

> `optional` **country-input:selection**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:selection"`\]

***

### country-input:subheader?

> `optional` **country-input:subheader**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-input:subheader"`\]

***

### country-name?

> `readonly` `optional` **country-name**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-name"`\]

Defined in: dist/types.d.ts:383

Country list item title.

#### Default Value

`'<country.name>'`

***

### country-prepend?

> `readonly` `optional` **country-prepend**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"country-prepend"`\]

Defined in: dist/types.d.ts:392

Country list item prepended content.

#### Default Value

Use the `country-display` slot with a decorative purpose.

***

### default?

> `readonly` `optional` **default**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"default"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1151

***

### details?

> `readonly` `optional` **details**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"details"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1125

***

### label?

> `readonly` `optional` **label**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"label"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1142

***

### loader?

> `readonly` `optional` **loader**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"loader"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1148

***

### message?

> `readonly` `optional` **message**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"message"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1128

***

### prepend?

> `readonly` `optional` **prepend**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"prepend"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1119

***

### prepend-inner?

> `readonly` `optional` **prepend-inner**: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`VPhoneInputCountrySlots`](VPhoneInputCountrySlots.md)\<`Country`\> & \{ \[K in string \| number \| symbol as K extends string ? \`country-input:$\{K\<K\>\}\` : never\]: ComponentSlots\<CountryComponent\>\[K\] \} & `object`\>\[`"prepend-inner"`\]

Defined in: node\_modules/vuetify/lib/components/VTextField/VTextField.d.ts:1136
