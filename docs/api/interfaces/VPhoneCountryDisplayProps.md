[v-phone-input](../globals.md) / VPhoneCountryDisplayProps

# Interface: VPhoneCountryDisplayProps\<Country\>

Defined in: dist/types.d.ts:288

**`Internal`**

Component properties for country display components.

## Extends

- [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`ExtractPropTypes`\<[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<*typeof* `makePhoneInputCountryDisplayProps`\>\>\>

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

## Properties

### country

> `readonly` **country**: \[\{ `required`: `true`; `type`: `PropType`\<`Country`\>; \}\] *extends* \[`Prop`\<`V`, `D`\>\] ? `unknown` *extends* `V` ? keyof `V` *extends* `never` ? `IfAny`\<`V`, `V`, `D`\> : `V` : `V` : `object`

Defined in: dist/props/makePhoneInputCountryDisplayProps.d.ts:12

Country to display.

#### Inherited from

`Readonly.country`

***

### decorative?

> `readonly` `optional` **decorative**: `boolean`

Defined in: dist/props/makePhoneInputCountryDisplayProps.d.ts:20

Tells if the icon should be ignored by screen readers or if it must have
an accessible name (e.g. through `title` attribute).

#### Inherited from

`Readonly.decorative`
