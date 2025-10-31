[v-phone-input](../globals.md) / memoizeGuessPhoneCountry

# Function: memoizeGuessPhoneCountry()

## Call Signature

> **memoizeGuessPhoneCountry**\<`Guess`\>(`guess`, `get`, `set`): `Guess` & `object`

Defined in: dist/utilities/memoizeGuessPhoneCountry.d.ts:6

Create a memoized guess country function with memoization getter and setter.

### Type Parameters

#### Guess

`Guess` *extends* () => [`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md)\>

### Parameters

#### guess

`Guess`

#### get

() => `string` \| `null`

#### set

(`value`) => `void`

### Returns

`Guess` & `object`

## Call Signature

> **memoizeGuessPhoneCountry**\<`Guess`\>(`guess`, `ref`): `Guess` & `object`

Defined in: dist/utilities/memoizeGuessPhoneCountry.d.ts:12

Create a memoized guess country function with a memoization ref.

### Type Parameters

#### Guess

`Guess` *extends* () => [`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md)\>

### Parameters

#### guess

`Guess`

#### ref

`Ref`\<`string` \| `null`\>

### Returns

`Guess` & `object`
