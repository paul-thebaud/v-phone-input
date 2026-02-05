[v-phone-input](../globals.md) / VPhoneInputCountrySlots

# Interface: VPhoneInputCountrySlots\<Country\>

Defined in: dist/types.d.ts:361

**`Internal`**

Component direct slots for `VPhoneInput`.

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### country-append

> `readonly` **country-append**: (`scope`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[] \| `undefined`

Defined in: dist/types.d.ts:402

Country list item appended content.

#### Default Value

`'+<country.dialCode>'` if `countryIconMode` property, `country-display` or
`country-prepend` is defined, nothing otherwise.

***

### country-display

> `readonly` **country-display**: (`scope`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[] \| `undefined`

Defined in: dist/types.d.ts:373

Country display.

#### Remarks

`decorative` tells if the display should be ignored by screen readers or
if it must have an accessible name (e.g. through `title` attribute).

#### Default Value

Country display component from `countryDisplayComponent` property if available,
`'+<country.dialCode>'` otherwise.

***

### country-name

> `readonly` **country-name**: (`scope`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[] \| `undefined`

Defined in: dist/types.d.ts:383

Country list item title.

#### Default Value

`'<country.name>'`

***

### country-prepend

> `readonly` **country-prepend**: (`scope`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[] \| `undefined`

Defined in: dist/types.d.ts:392

Country list item prepended content.

#### Default Value

Use the `country-display` slot with a decorative purpose.
